import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import './style/NewsletterWidget.scss';

function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const emailPrefill = email || 'tuan@example.com';
  const urlForm = `https://docs.google.com/forms/d/e/1FAIpQLSeb_EUrOZUWELJQ-JWJHFcHAgp7PUNghahENpX_wNIfR4AVCA/viewform?entry.1923931752=${emailPrefill}`;
  return (
    <aside className="single_sidebar_widget newsletter_widget">
      <h4 className="widget_title">Newsletter</h4>
      <div className="form-group d-flex flex-row">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            aria-label="email-subscribe"
            placeholder="tuan@example.com"
            value={email}
            onChange={((ev) => setEmail(ev.target.value))}
          />
        </div>
        <a
          href={urlForm}
          role="button"
          aria-label="subscribe"
          className="bbtns"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </a>
      </div>
    </aside>
  );
}

export default NewsletterWidget;
