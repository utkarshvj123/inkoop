import React, { Component } from "react";
import Axios from "axios";
import PaginationGeneric from "../../component/PaginationGeneric";
import { MDBDataTable } from "mdbreact";
import "./style.scss";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPageToShow: [],
      data: {},
      currentSelected: 1,
      error: false,
      columns: [],
    };
  }

  componentDidMount() {
    this.callingApiForGettingData();
  }

  //------For calling api and getting data-----
  callingApiForGettingData = () => {
    Axios.get(
      "https://rickandmortyapi.com/api/episode?page=" +
        this.state.currentSelected
    )
      .then((response) => {
        const totalPageToShow = [];
        if (response.data.info.pages) {
          for (let i = 0; i < response.data.info.pages; i++) {
            console.log(i, "....i");
            totalPageToShow.push(i + 1);
          }
        }
        //----setting state and creating required columns for table-----
        this.setState({
          totalPageToShow,
          data: response.data,
          error: false,
          columns: [
            {
              label: "Name",
              field: "name",
              sort: "asc",
            },
            {
              label: "Date",
              field: "air_date",
              sort: "asc",
            },
            {
              label: "Episode",
              field: "episode",
              sort: "asc",
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error, "....error");
        this.setState({ error: true });
      });
  };
  //-----Handle page number clicked------//
  handlePageChange = (pageNumber, nextOrPrev) => {
    console.log(nextOrPrev, "handle clicked", pageNumber);
    if (pageNumber === "next") {
      this.setState({ currentSelected: this.state.currentSelected + 1 }, () => {
        this.callingApiForGettingData();
      });
    } else if (pageNumber === "prev") {
      this.setState({ currentSelected: this.state.currentSelected - 1 }, () => {
        this.callingApiForGettingData();
      });
    } else {
      this.setState({ currentSelected: pageNumber }, () => {
        this.callingApiForGettingData();
      });
    }
  };
//-----Creating json for table-----//
  creatingJsonForTable = () => {
    let creatingRow = [];
    let newData = {};

    if (this.state.data.results) {
      this.state.data.results.map((object) => {
        creatingRow.push({
          name: object.name,
          episode: object.episode,
          air_date: object.air_date,
        });
      });
    }
    newData.columns = this.state.columns;
    newData.rows = creatingRow;
    return newData;
  };

  render() {
    const newData = this.creatingJsonForTable();
    return (
      <div className="container">
        <MDBDataTable striped bordered small data={newData} paging={false} />
        <PaginationGeneric
          containerStyle={{ position: "absolute" }}
          currentSelected={this.state.currentSelected}
          handlePageChange={this.handlePageChange}
          totalPageToShow={this.state.totalPageToShow}
          next={this.state.data.info ? this.state.data.info.next : ""}
          prev={this.state.data.info ? this.state.data.info.prev : ""}
        />
      </div>
    );
  }
}
