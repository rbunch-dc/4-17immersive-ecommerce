import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import GetCart from '../actions/GetCart'

class Cart extends Component{

	componentDidMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.getCart(this.props.loginInfo.token)
		}else{

		}
	}

	render(){
		console.log(this.props.cartInfo)
		return(
			<h1>Cart</h1>
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