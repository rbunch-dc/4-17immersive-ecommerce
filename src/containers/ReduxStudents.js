import React, {Component} from 'react'
// We need some glue between react and reudx. This component/container
// needs to know about redux state. The answer? The connect method from
// the react-redux module. The glue.
import { connect } from 'react-redux';

class ReduxStudents extends Component{
	render(){
		console.log(this.props.students)
		var studentArray = [];
		this.props.students.map((student,index)=>{
			studentArray.push(<li key={index}>{student}</li>)
		})
		return(
			<div>
				<h1>This is ReduxStudents</h1>
				{studentArray}
			</div>
		)
	}
}

// All containers that need access to state will have this function.
// we are creating a mapping between redux state and this components props
function mapStateToProps(state){
	// mapStateToProps returns an object with each peice of state we need
	return{
		// From our master Reducer, we have a "state" object
		// INside of that state object, we have a property: students
		// This exists because we made it a property in the root reducer
		students: state.students
	}
}

// INSTEAD of exporting the class (component), we export connect
export default connect(mapStateToProps)(ReduxStudents);