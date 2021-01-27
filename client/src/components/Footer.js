import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    };

    return (
        <div id="main-footer" className="text-center p-2">
            <Row>
                <Col>
                    <p>Copyright &copy;<spen>{thisYear()}</spen></p>
                </Col>
            </Row>
        </div>
    )
};

export default Footer;