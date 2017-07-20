import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import GetCart from '../actions/GetCart'
import ProductTableRow from '../components/ProductTableRow';
import $ from 'jquery'

class Cart extends Component{
	constructor(props) {
		super(props);
		this.makePayment = this.makePayment.bind(this);
		this.sortTable = this.sortTable.bind(this);
		this.state = {
			whichWay: 1
		}
	}

	componentDidMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.getCart(this.props.loginInfo.token)
		}else{

		}
	}

	makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_K9L17worNm0z7lHpdssTpwqr',
            locale: 'auto',
            image: 'http://www.digitalcrafts.com/sites/all/themes/digitalcrafts/images/digitalcrafts-site-logo.png',
            token: (token)=> {
            	console.log(token);
                var theData = {
                    amount: this.props.cartInfo.totalPrice * 100,
                    stripeToken: token.id,
                    userToken: this.props.loginInfo.token,
                }
                $.ajax({
                    method: 'POST',
                    url: window.hostAddress+'/stripe',
                    data: theData
                }).done((data) => {
                    console.log(data);
                    if (data.msg === 'paymentSuccess') {
                    	this.props.history.push('/thank-you');
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Pay Now',
            amount: this.props.cartInfo.totalPrice * 100
        })
    }

	sortTable(columnName){
		console.log(columnName)
		var productList = this.props.cartInfo.products.slice();

		productList.sort((a, b) =>{
			console.log(a)
			console.log(b)
		    var textA = a[columnName];
		    var textB = b[columnName];
		    // ternary statement, after ? if true, after : if false
		    if(this.state.whichWay){
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			}else{
				return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
			}
		});
		this.setState({
			productList: productList,
			whichWay: !this.state.whichWay
		})
	}    

	render(){

		if(this.props.cartInfo.products == undefined){
			return (
				<div>
					<h3>Your cart is empty! Get shopping or <Link to="/login">login</Link></h3>
				</div>
			)
		}

		var cartArray = [];
		this.props.cartInfo.products.map((product,index)=>{
			console.log(product)
			cartArray.push(
				<ProductTableRow 
					key={index} 
					product={product} 
					addToCart={null}
					loggedIn={false}
					token={null}
				/>				
			)
		})


		console.log(this.props.cartInfo)
		return(
			<div>
				<div>
					Your order total is: ${this.props.cartInfo.totalPrice} | 
					<button className="btn btn-primary" onClick={this.makePayment}>
						Pay now!
					</button>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th className="table-head" onClick={
								()=>{this.sortTable("productName")
							}}>Product Name</th>
							<th className="table-head" onClick={()=>{this.sortTable("productScale")}}>Model Scale</th>
							<th className="table-head" onClick={()=>{this.sortTable("productVendor")}}>Made By</th>
							<th className="table-head" onClick={()=>{this.sortTable("productDescription")}}>Description</th>
							<th className="table-head" onClick={()=>{this.sortTable("quantityInStock")}}>In Stock</th>
							<th className="table-head" onClick={()=>{this.sortTable("buyPrice")}}>Your Price!</th>
							<th className="table-head" onClick={()=>{this.sortTable("MSRP")}}>MSRP</th>
						</tr>
					</thead>									

					<tbody>
						{cartArray}
					</tbody>
				</table>		
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		loginInfo: state.registerReducer,
		cartInfo: state.cartReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCart: GetCart
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)