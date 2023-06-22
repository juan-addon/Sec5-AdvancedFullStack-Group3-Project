import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';
import 'bootstrap/dist/css/bootstrap.css';

{/*Using HashRouter and wrapping the main page around the router*/ }
const element = (
    <Router>
        <Page />
    </Router>
);

const root = createRoot(document.getElementById('contents'));
root.render(element);