import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import EmployeeCreate from './EmployeeComponents/EmployeeCreate.jsx';
import EmployeeDelete from './EmployeeComponents/EmployeeDelete.jsx';
import EmployeeDetail from './EmployeeComponents/EmployeeDetail.jsx';
import EmployeeDirectory from './EmployeeComponents/EmployeeDirectory.jsx';
import EmployeeEdit from './EmployeeComponents/EmployeeEdit.jsx';
import NotFound from './NotFound.jsx';

{   /*Route Component - Switch is used so that only the first matched component is rendered*/
}
export default class Routes extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Redirect exact from="/" to="/home" />

                    <Route exact path="/home" component={EmployeeDirectory} />

                    <Route exact path="/add" component={EmployeeCreate} />

                    <Route exact path="/manage" component={EmployeeDirectory} />

                    <Route exact path="/detail/:id" component={EmployeeDetail} />

                    <Route exact path="/edit/:id" component={EmployeeEdit} />

                    <Route exact path="/delete/:id" component={EmployeeDelete} />

                    <Route component={NotFound} />
                </Switch>
            </>
        );
    }
}