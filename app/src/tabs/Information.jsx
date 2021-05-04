import React from 'react';
import {Divider, Typography} from 'antd';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {DrizzleContext} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";

const {Title, Paragraph} = Typography;
const {ContractData, ContractForm} = newContextComponents;



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function SellTable(props) {
    const {num} = props;
    console.log('table:', num);
    let rows = new Array(0);
    const classes = useStyles();
    if (num === undefined || num === null) {
        return <div/>;
    }
    let real_num = parseInt(num);
    rows = [...Array(real_num).keys()];

    return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Pending</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Seller</TableCell>
                        </TableRow>
                    </TableHead>
                    <DrizzleContext.Consumer>
                        {
                            drizzleContext => {

                                const {drizzle, drizzleState, initialized} = drizzleContext;

                                if (!initialized) {
                                    return "Loading...";
                                } else {

                                    return (
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row}>
                                                    <TableCell component="th" scope="row">
                                                        {row}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getSellRequestStatus"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}
                                                                      render={res => res == 1 ? "√" : "x"}/>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock"
                                                                      method="getSellRequestPrice"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>

                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getSellRequestStock"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getSellRequestAmount"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getSellRequestSeller"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )
                                }
                            }
                        }
                    </DrizzleContext.Consumer>
                </Table>
            </TableContainer>
    );
}

function BuyTable(props) {
    const {num} = props;
    console.log('table:', num);
    let rows = new Array(0);
    const classes = useStyles();
    if (num === undefined || num === null) {
        return <div/>;
    }
    let real_num = parseInt(num);
    rows = [...Array(real_num).keys()];

    return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Pending</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Buyer</TableCell>
                        </TableRow>
                    </TableHead>
                    <DrizzleContext.Consumer>
                        {
                            drizzleContext => {

                                const {drizzle, drizzleState, initialized} = drizzleContext;

                                if (!initialized) {
                                    return "Loading...";
                                } else {

                                    return (
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row}>
                                                    <TableCell component="th" scope="row">
                                                        {row}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getBuyRequestStatus"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}
                                                                      render={res => res == 1 ? "√" : "x"}/>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock"
                                                                      method="getBuyRequestPrice"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>

                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getBuyRequestStock"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getBuyRequestAmount"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ContractData contract="ContinuousAuctionStock" method="getBuyRequestBuyer"
                                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                                      methodArgs={[row]}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )
                                }
                            }
                        }
                    </DrizzleContext.Consumer>
                </Table>
            </TableContainer>
    );
}

class Information extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // userNumKey: null // data key
            buyNumKey: null,
            sellNumKey: null,
        };
    }

    componentDidMount() {
        const {drizzle} = this.props;
        const contract = drizzle.contracts.ContinuousAuctionStock;

        const buyNumKey = contract.methods["getNumBuyRequest"].cacheCall();

        const sellNumKey = contract.methods["getNumSellRequest"].cacheCall();

        this.setState({buyNumKey});
        this.setState({sellNumKey});

        // const userNumKey = contract.methods["numUsers"].cacheCall();

        // this.setState({userNumKey});
    }

    render() {
        const {ContinuousAuctionStock} = this.props.drizzleState.contracts;
        console.log(ContinuousAuctionStock);
        const numBuyRequest = ContinuousAuctionStock.getNumBuyRequest[this.state.buyNumKey];
        const numSellRequest = ContinuousAuctionStock.getNumSellRequest[this.state.sellNumKey];
        // const numUser = ContinuousAuctionStock.numUsers[this.state.userNumKey];
        return (
            <div>
                <DrizzleContext.Consumer>
                    {
                        drizzleContext => {

                            const {drizzle, drizzleState, initialized} = drizzleContext;

                            if (!initialized) {
                                return "Loading...";
                            } else {

                                return (
                                    <Typography>
                                        <Title level={2}>Overall Information of the system </Title>
                                        <br/>
                                        <b>Issuer</b>: <ContractData contract="ContinuousAuctionStock" method="issuer"
                                                                    drizzle={drizzle} drizzleState={drizzleState}/>
                                        <br/>
                                        <b>Number of issued stock: </b> <ContractData contract="ContinuousAuctionStock"
                                                                               drizzle={drizzle}
                                                                               drizzleState={drizzleState}
                                                                               method="count"/>
                                        <br/>
                                        <b>Pricing Factor</b>: <ContractData contract="ContinuousAuctionStock"
                                                                              drizzle={drizzle}
                                                                              drizzleState={drizzleState}
                                                                              method="pricingFactor"/> wei / price
                                        <br/>
                                        <Divider/>

                                        <Title level={3}> Sell Requests: </Title>

                                        <SellTable num={numSellRequest && numSellRequest.value}/>
                                        {/*rows={[...Array(numUser && numUser.value).keys()]}*/}

                                        <Title level={3}> Buy Requests: </Title>

                                        <BuyTable num={numBuyRequest && numBuyRequest.value}/>

                                        <Divider/>
                                            {/* <ContractForm 
                                            drizzle={drizzle} 
                                            contract="ContinuousAuctionStock" 
                                            method="sell"
                                            labels={["Amount", "Price"]}/> */}
                                        <Divider/>
                                        <Paragraph ellipsis={{rows: 3, expandable: true}}>
                                            Notice: Due to the transaction cost, the status is updated
                                            at a certain time interval. Upon refreshing, you may still see the
                                            same result.
                                        </Paragraph>
                                    </Typography>
                                )
                            }
                        }
                    }
                </DrizzleContext.Consumer>
            </div>
        );
    }
}

export default Information;