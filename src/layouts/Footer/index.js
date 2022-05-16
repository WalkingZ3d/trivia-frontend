import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto">
        <br/>
        <div className="container justify-content-center">
            <div className="row ">
                <div className="col-sm-12 ">
                    <p id="socialsHeader">GitHub Profiles</p>
                </div>
            </div>
        </div>
        <div className="container justify-content-center">
            <div className="row ">
                <div className="col-sm-12 ">
                    <p>
                        Dan <a href="https://github.com/WalkingZ3d" target="_blank" id="socialButton"><button type="button" className="btn btn-social-icon btn-outline-github"><i className="fa fa-github"></i></button></a>
                        Jianli <a href="https://github.com/jianli1028" target="_blank" id="socialButton"><button type="button" className="btn btn-social-icon btn-outline-github"><i className="fa fa-github"></i></button></a> 
                        Libby <a href="https://github.com/LibertySprackling" target="_blank" id="socialButton"><button type="button" className="btn btn-social-icon btn-outline-github"><i className="fa fa-github"></i></button></a> 
                        Doreen <a href="https://github.com/doreenkam" target="_blank" id="socialButton"><button type="button" className="btn btn-social-icon btn-outline-github"><i className="fa fa-github"></i></button></a>                     
                    </p>
                </div>
            </div>
        </div>       
        <p id="nameEnd"> &copy; {new Date().getFullYear()} Copyright: Neweet </p>
    </footer>
    )
}

export default Footer;