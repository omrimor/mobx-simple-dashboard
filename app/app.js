import 'assets/stylesheets/main.scss';
import 'react-widgets/lib/scss/react-widgets.scss';
import 'bootstrap-css-only';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from 'store';

import AutoUpdate from 'components/common/AutoUpdateHOC';
import Root from 'components/Root';
import Home from 'components/Home/Home';
import NotFound from 'components/NotFound/NotFound';


const renderApp = () => {
    render(
        <Provider store={ store }>
            <Router history={ browserHistory }>
                <Route component={ Root }>
                    <Route name="home" path="/" component={ AutoUpdate(Home) }/>
                </Route>
                <Route path="*" component={ NotFound }/>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
};
renderApp();
