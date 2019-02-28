
import { Navbar } from 'react-bootstrap';

const Header = () => {
  return (
			<Navbar staticTop fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">
							<img className="logo pull-left" src="assets/images/cwt-logo.svg" />
							<h1 className="pull-left">CWT CI-Dashboard</h1>
						</a>
					</Navbar.Brand>
				</Navbar.Header>
			</Navbar>
		);
};

export default Header;