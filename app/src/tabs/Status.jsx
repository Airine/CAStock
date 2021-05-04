import React from 'react';
import {Button, Divider, Form, InputNumber, message, Typography} from 'antd';
import {newContextComponents} from "@drizzle/react-components";
import {DrizzleContext} from "@drizzle/react-plugin";
import options from "../drizzleOptions";


const {ContractData} = newContextComponents;
const {Title, Paragraph} = Typography;


class TopUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(checked) {
        this.setState({
            advanced: checked
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.callback(values);
            }
        });
    };

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Form style={{width: '200px', marginTop: '50px', margin: 'auto'}} layout="vertical"
                  onSubmit={this.handleSubmit}>
                <Form.Item label="Price:">
                    {getFieldDecorator('price', {
                        initialValue: 0
                    })(
                        <InputNumber style={{width: '200px'}} min={0}/>
                    )}

                </Form.Item>

                <Form.Item label="Value (wei):">
                    {getFieldDecorator('value', {
                        initialValue: 0
                    })(
                        <InputNumber style={{width: '200px'}} min={0}/>
                    )}

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '200px'}}>
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        )
    }
}

const InlineTopUpForm = Form.create({name: 'topup_form'})(TopUpForm);


function UserStatus(props) {
    const {address} = props;
    
    return (
        <DrizzleContext.Consumer>
            {
                drizzleContext => {

                    const {drizzle, drizzleState, initialized} = drizzleContext;
                    if (!initialized) {
                        return "Loading...";
                    } else {

                        return (
                                <Typography>

                                    <Title level={4}>Holding stocks:
                                        <ContractData contract="ContinuousAuctionStock" method="stocks"
                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                      methodArgs={[address]}
                                                      render={res => res}/>
                                    </Title>

                                    <Title level={4}>
                                        Balance (GWei):
                                        <ContractData contract="ContinuousAuctionStock" method="balance"
                                                      drizzle={drizzle} drizzleState={drizzleState}
                                                      methodArgs={[address]}
                                                      render={res => res/1e9 }/>
                                        gwei
                                    </Title>

                                    <Divider/>

                                    <Title level={4}>Your address: {address}</Title>
                                    
                                    {/* <Title level={3}>Send a buy request: </Title>

                                    <InlineTopUpForm callback={props.callback}/> */}

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
    )
}

class Status extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            password: props.password,
            contract: null,
            // userIdKey: 0,
        };
        this.topUp = this.topUp.bind(this);
    }

    componentDidMount() {
        const {drizzle} = this.props;
        const contract = drizzle.contracts.ContinuousAuctionStock;
        // const userIdKey = contract.methods["getUserID"].cacheCall(this.state.address);

        this.setState({contract})
    }

    topUp(values) {
        const {value} = values;
        const w3 = options.web3.httpProvider;
        console.log(values);
        w3.eth.personal.unlockAccount(this.state.address, this.state.password, 1500).then((response) => {
            // this.state.contract.methods.addBalance().send({
            //     from: this.state.address,
            //     gas: 3000000,
            //     value: Number(value)
            // }).on('transactionHash', function (hash) {
            //     console.log('hash:', hash);
            // }).on('confirmation', function (confirmationNumber, receipt) {
            //     console.log('confirmed:', confirmationNumber);
            // }).on('receipt', function (receipt) {
            //     console.log(receipt);
            // }).on('error', function (error, receipt) {
            //     console.log('error', error);
            // });
        }).catch((error) => {
            console.log(error);
            message.error({content: "Wrong password!"});
        });
    }

    render() {
        // const {ContinuousAuctionStock} = this.props.drizzleState.contracts;
        // const userId = ContinuousAuctionStock.getUserID[this.state.userIdKey];

        return (
            <div>
                <UserStatus callback={this.topUp} address={this.state.address}/>
            </div>
        );
    }
}

export default Status;