import React from 'react';
import './styles/Password.css';


const PasswordPolicy = () => {
  return (
<section>
<p className="common-fonts password-heading">password policy</p>

<div className='password-rules'>
    <div>
        <label class="custom-checkbox password-checkbox">
            <input type="checkbox" className="cb1" />
            <span class="checkmark"></span>
        </label>
    </div>
    <div>
        <p className="common-fonts password-text">minimum 8 characters long</p>
        <input type="text" className='common-input password-input common-fonts' name=""/>
    </div>
</div>
<div className='password-rules'>
    <div>
        <label class="custom-checkbox password-checkbox">
            <input type="checkbox" className="cb1" />
            <span class="checkmark"></span>
        </label>
    </div>
    <div>
        <p className="common-fonts password-text">number, symbol, or whitespace character</p>
        <input type="text" className='common-input password-input' name="" id="password-input" />
    </div>
</div>
<div className='password-rules'>
    <div>
        <label class="custom-checkbox password-checkbox">
            <input type="checkbox" className="cb1" />
            <span class="checkmark"></span>
        </label>
    </div>
    <div>
        <p className="common-fonts password-text">uppercase character</p>
        <input type="text" className='common-input password-input' name="" id="password-input" />
    </div>
</div>
<div className='password-rules'>
    <div>
        <label class="custom-checkbox password-checkbox">
            <input type="checkbox" className="cb1" />
            <span class="checkmark"></span>
        </label>
    </div>
    <div>
        <p className="common-fonts password-text">special character</p>
        <input type="text" className='common-input password-input' name="" id="password-input" />
    </div>
</div>

<div className="password-authentication">
        <p className="password-two-factor password-fonts">Two-factor authentication</p>
          <div>
            <label className="password-switch">
              <input type="checkbox"/>
              <span className="password-slider password-round"></span>
            </label>
          </div>
      </div>

      <div>
        <p className="password-bottom password-fonts">Protect your account ankitaschauhan96@gmail.com with two-factor authentication via email. Once enabled, then the next time you log in, you are asked to click the verification link in an email to access your account. You only need to verify yourself every 30 days on each device.</p>
      </div>
</section>





   


  )
}

export default PasswordPolicy