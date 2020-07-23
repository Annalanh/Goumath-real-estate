import React from 'react';
import axios from 'axios';
import { login, isLogin, setUserRole, setUsername } from '../../../utils/auth'
import { useHistory, useLocation } from "react-router-dom";

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	handleLogin(e) {
		let { username, password } = this.state;
		e.preventDefault()
		axios.post('http://localhost:8081/auth/login', { username, password })
			.then(res => {
				let resData = res.data
				if (resData.status) {
					login(resData.token)
					setUsername(resData.username)
					setUserRole('admin')
					// let history = this.props.history
					let location = this.props.location
					let { from } = location.state;
					window.location.href = from.pathname
				}else{
					console.log(resData.message)
				}
			})
	}

	handleOnChangeUsername(e) {
		this.setState({
			username: e.target.value
		})
	}

	handleOnChangePassword(e) {
		this.setState({
			password: e.target.value
		})
	}

	render() {
		if (isLogin()) {
			this.props.history.push("/")
		}
		return (
			<>
				<div className="kt-grid kt-grid--ver kt-grid--root kt-page" style={{ height: "100%" }}>
					<div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin" id="kt_login">
						<div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" style={{ backgroundImage: "url(/assets/media/bg/bg-3.jpg)" }}>
							<div className="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
								<div className="kt-login__container">
									<div className="kt-login__logo">
										<a href="#">
											<img src="/assets/media/logos/logo-5.png" />
										</a>
									</div>
									<div className="kt-login__signin">
										<div className="kt-login__head">
											<h3 className="kt-login__title">Sign In To Admin</h3>
										</div>
										<form className="kt-form" action="">
											<div className="input-group">
												<input className="form-control" type="text" placeholder="Username" name="username" onChange={(e) => this.handleOnChangeUsername(e)} />
											</div>
											<div className="input-group">
												<input className="form-control" type="password" placeholder="Password" name="password" onChange={(e) => this.handleOnChangePassword(e)} />
											</div>
											<div className="row kt-login__extra">
												<div className="col">
													<label className="kt-checkbox">
														<input type="checkbox" name="remember" /> Remember me
												  <span></span>
													</label>
												</div>
												<div className="col kt-align-right">
													<a href="javascript:;" id="kt_login_forgot" className="kt-login__link">Forget Password ?</a>
												</div>
											</div>
											<div className="kt-login__actions">
												<button id="kt_login_signin_submit" className="btn btn-brand btn-elevate kt-login__btn-primary" onClick={(e) => this.handleLogin(e)}>Sign In</button>
											</div>
										</form>
									</div>
									<div className="kt-login__forgot">
										<div className="kt-login__head">
											<h3 className="kt-login__title">Forgotten Password ?</h3>
											<div className="kt-login__desc">Enter your email to reset your password:</div>
										</div>
										<form className="kt-form" action="">
											<div className="input-group">
												<input className="form-control" type="text" placeholder="Email" name="email" id="kt_email" />
											</div>
											<div className="kt-login__actions">
												<button id="kt_login_forgot_submit" className="btn btn-brand btn-elevate kt-login__btn-primary">Request</button>&nbsp;&nbsp;
										<button id="kt_login_forgot_cancel" className="btn btn-light btn-elevate kt-login__btn-secondary">Cancel</button>
											</div>
										</form>
									</div>
									<div className="kt-login__account">
										<span className="kt-login__account-msg">
											Don't have an account yet ?
								</span>
								&nbsp;&nbsp;
								<a href="/signup" id="kt_login_signup" className="kt-login__account-link">Sign Up!</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default LoginPage;