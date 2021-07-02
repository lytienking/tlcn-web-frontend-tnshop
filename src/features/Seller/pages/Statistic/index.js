import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import userApi from "../../../../api/userApi";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./index.scss";
import { Col, Row } from "reactstrap";
const useStyles = makeStyles({
  root: {
    minWidth: 300,
    display: "inline-block",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  money: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bolder",
  },
});
const Statistic = () => {
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const response = await userApi.getOrderBySeller();
      console.log("ref", response);
    })();
  }, []);

  return (
    <div>
      <Row className="row-card">
        <Col xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Tổng doanh thu
              </Typography>
              <Typography className={classes.money}>10.000.000đ</Typography>
            </CardContent>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Tổng chiết khấu
              </Typography>
              <Typography className={classes.money}>10.000.000đ</Typography>
            </CardContent>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Tổng đơn hàng
              </Typography>
              <Typography className={classes.money}>30</Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
      <div className="chart">
        <Bar
          data={{
            labels: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 5",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
            datasets: [
              {
                label: "Theo tháng",
                data: [12, 31, 5, 17, 6, 19],
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(255, 159, 64, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={500}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};
export default Statistic;
