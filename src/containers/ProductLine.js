import React, {Component} from 'react'
import $ from 'jquery';

class ProductLine extends Component{
	constructor(props) {
		super(props);
		this.state = {
			productList: []
		}
	}

	componentDidMount() {
		// console.log(this.props.match)
		const pl = this.props.match.params.productLine
		// console.log(pl)
		const url = window.hostAddress + `/productlines/${pl}/get`
		$.getJSON(url,(data)=>{
			console.log(data);
			this.setState({
				productList: data
			})
		});
	}

	render(){

		var productTableArray = [];
		this.state.productList.map((product, index)=>{
			if(product.quantityInStock > 100){
				var inStock = "In Stock!"
			}else if(product.quantityInStock >0){
				var inStock = '<td className="text-caution">Order Soon!</td>'
			}else{
				var inStock = '<td className="text-danger">Out of stock!</td>'
			}
			productTableArray.push(
				<tr key={index} >
					<td>{product.productName}</td>
					<td>{product.productScale}</td>
					<td>{product.productVendor}</td>
					<td>{product.productDescription}</td>
					{inStock}
					<td>{product.buyPrice}</td>
					<td>{product.MSRP}</td>
				</tr>
			)
		})

		return(
			<div>
				<h1>{this.props.match.params.productLine}</h1>
				<table className="table table-striped">
					<thead>
						<th>Product Name</th>
						<th>Model Scale</th>
						<th>Made By</th>
						<th>Description</th>
						<th>In Stock</th>
						<th>Your Price!</th>
						<th>MSRP</th>
					</thead>
					<tbody>
						{productTableArray}
					</tbody>
				</table>
			</div>
		)		
	}
}

export default ProductLine;