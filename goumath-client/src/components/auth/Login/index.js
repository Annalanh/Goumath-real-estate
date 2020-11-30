import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './style.css'
import { withTranslation } from 'react-i18next';
import { login, isLogin, setUserRole, setUsername, setUserId } from '../../../utils/auth'

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		}
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleLogin(e) {
		let { username, password } = this.state;
		let { t } = this.props
		e.preventDefault()
		axios.post('http://localhost:8081/auth/login', { username, password })
			.then(res => {
				console.log("res", res)
				let resData = res.data
				if (resData.status) {
					login(resData.token)
					setUsername(resData.username)
					setUserId(resData.userId)
					if(resData.is_admin)setUserRole('admin')
					let location = this.props.location
					if (location.state) {
						let { from } = location.state;
						window.location.href = from.pathname
					} else {
						window.location.href = "/"
					}
				} else {
					swal(t("common:error"), t(resData.message), "error")
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
		let { t } = this.props
		if (isLogin()) {
			this.props.history.push("/")
		}
		return (
			<>
				<div className="kt-grid kt-grid--ver kt-grid--root kt-page" style={{ height: "100%" }}>
					<div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin" id="kt_login">
						<div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" style={{ backgroundImage: "url(/assets/gou-imgs/bg-3.jpg)" }}>
							<div className="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
								<div className="kt-login__container">
									<div className="kt-login__logo">
										<a href="#">
											<img src="/assets/gou-icons/logo-5.png" />
										</a>
									</div>
									<div className="kt-login__signin">
										<div className="kt-login__head">
											<h3 className="kt-login__title">{t('sign in')}</h3>
										</div>
										<form className="kt-form" action="">
											<div className="input-group">
												<input className="form-control" type="text" placeholder={t('profilePage:username')} name="username" onChange={(e) => this.handleOnChangeUsername(e)} />
											</div>
											<div className="input-group">
												<input className="form-control" type="password" placeholder={t('profilePage:password')} name="password" onChange={(e) => this.handleOnChangePassword(e)} />
											</div>
											<div className="row kt-login__extra">
												<div className="col">
													<label className="kt-checkbox">
														<input type="checkbox" name="remember" /> {t('remember me')}
														<span></span>
													</label>
												</div>
												<div className="col kt-align-right">
													<a href="javascript:;" id="kt_login_forgot" className="kt-login__link">{t('forgot password')} ?</a>
												</div>
											</div>
											<div className="kt-login__actions">
												<button id="kt_login_signin_submit" className="btn btn-brand btn-elevate kt-login__btn-primary" onClick={(e) => this.handleLogin(e)}>{t('sign in')}</button>
											</div>
										</form>
									</div>
									<div className="kt-login__account">
										<span className="kt-login__account-msg">
											{t("don't have an account yet")} ?
								</span>
								&nbsp;&nbsp;
								<a href="/signup" id="kt_login_signup" className="kt-login__account-link">{t('sign up')}!</a>
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

export default withTranslation(['authPage', 'profilePage'])(LoginPage);