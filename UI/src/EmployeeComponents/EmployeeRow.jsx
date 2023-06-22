import React from "react";
import { Link } from 'react-router-dom';

{/*Component which display each employee row data in tabular format */ }
export default class EmployeeRow extends React.Component {
	render() {
		const {
			employee: {
				_id,
				firstName,
				lastName,
				age,
				dateOfJoining,
				title,
				department,
				employeeType,
				currentStatus
			},
			count
		} = this.props;


		return (
			<tr>
				<td>{count}</td>
				<td>{firstName}</td>
				<td>{lastName}</td>
				<td>{age}</td>
				<td>{dateOfJoining.toISOString().split('T')[0]}</td>
				<td>{title}</td>
				<td>{department}</td>
				<td>{employeeType.replace('_', ' ')}</td>
				<td>{currentStatus == 1 ? 'Working' : 'Retired'}</td>
				<td className="text-center">
					<Link to={`/detail/${_id}`} className="btn btn-sm btn-outline-primary me-1">
						<i className='fa fa-eye' title='View'></i>
					</Link>
					<Link to={`/edit/${_id}`} className="btn btn-sm btn-outline-success me-1">
						<i className='fa fa-edit' title='Edit'></i>
					</Link>
					<Link to={`/delete/${_id}`} className="btn btn-sm btn-outline-danger">
						<i className="fa fa-trash" style={{ color: 'red' }} title="Delete"></i>
					</Link>
				</td>
			</tr >
		);
	}
}