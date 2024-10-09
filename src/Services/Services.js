import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Contact Us</h1>
      <div className="services-content">
        {/* Address Section */}
        <div className="services-section address-section">
          <h2>Headquarters</h2>
          <p>1234 Main Street, Suite 100<br />
          Metropolis, CA 90210<br />
          USA</p>

          <h2>Regional Offices</h2>
          <p><strong>New York Office:</strong><br />
          5678 Broadway, 4th Floor<br />
          New York, NY 10001<br />
          USA</p>
          <p><strong>Chicago Office:</strong><br />
          9101 State Street, 2nd Floor<br />
          Chicago, IL 60601<br />
          USA</p>

        </div>

        {/* Contact Section */}
        <div className="services-section contact-section">
          <h2>Customer Care</h2>
          <p>For assistance, please contact our customer care team:</p>
          <p><strong>Email:</strong> support@company.com<br />
          <strong>Phone:</strong> +1 (555) 123-4567<br />
          <strong>Fax:</strong> +1 (555) 765-4321</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
