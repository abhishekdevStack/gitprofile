import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import TextField from "../Layout/textFields";
import Card from "../Layout/card";
const GitParentDiv = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 20px 20px;
`;
const GitImageDiv = styled.div`
  margin: 10px 15px;
  padding: 20px 20px;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  height: 30px;
`;
const GitTitle = styled.span`
  vertical-align: middle;
  padding: 10px 10px;
`;
const GitContainer = styled(Grid)`
  overflow-y: auto;
  height: 290px;
`;
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      details: [],
      per: 6,
      page: 1,
      total_pages: null,
      scrolling: true,
    };
  }
  loadUser = () => {
    const { per, page, data } = this.state;
    const url = `/user/info/${per}/${page}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          data: json,
          copyData: json,
          scrolling: false,
          total_pages: 100,
        })
      );
  };
  loadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        per: prevState.per + 6,
        scrolling: true,
      }),
      this.loadUser()
    );
  };
  componentWillMount() {
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handleScroll(e);
    });
    this.loadUser();
  }
  searchText(val) {
    let copyData = JSON.parse(JSON.stringify(this.state.data));
    let filterArray = [];
    if (val.length) {
      copyData.forEach((rec) => {
        if (
          (rec.bio && rec.bio.includes(val)) ||
          (rec.name && rec.name.includes(val))
        ) {
          filterArray.push(rec);
        }
      });
      this.setState({ data: filterArray });
    } else {
      this.setState({ data: JSON.parse(JSON.stringify(this.state.copyData)) });
    }
  }
  handleScroll = () => {
    // var lastLi = document.getElementsByClassName(".containerGrid");
    // var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    // var pageOffset = window.pageYOffset + window.innerHeight;
    // if (pageOffset > lastLiOffset) {
    //   this.loadMore();
    // }
    this.loadMore();
  };
  render() {
    return (
      <GitParentDiv>
        <Typography component="div" style={{ height: "60vh" }}>
          <Typography
            component="div"
            style={{ backgroundColor: "#eeee", height: "20vh" }}
          >
            <GitImageDiv>
              <GitTitle>
                <AvatarImg
                  alt="glogo"
                  src="https://photos.angel.co/startups/i/60436-22967c4ce89dbdbd4a8d49b090509a78-medium_jpg.jpg?buster=1517982458"
                ></AvatarImg>
              </GitTitle>
              <GitTitle>Github Profile Viewer</GitTitle>
            </GitImageDiv>
            <Grid container spacing={2} className="containerGrid">
              <Grid item xs={12}>
                <TextField getText={this.searchText.bind(this)} />
              </Grid>
            </Grid>
          </Typography>
          <GitContainer container spacing={1} onScroll={this.handleScroll}>
            {this.state.data.length &&
              this.state.data.map((record, i) => (
                <Grid key={i} item xs={6}>
                  <Card key={i} record={record} />
                </Grid>
              ))}
          </GitContainer>
        </Typography>
      </GitParentDiv>
    );
  }
}

export default User;
