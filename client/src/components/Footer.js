const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div className="footer-logo">Чесний Магазин</div>
        <div className="footer-contacts">
          <p className="contact footer-sub-header">Контакти</p>
          <p className="contact-email footer-info">chesniymagazin@gmail.com</p>
          <p className="contact-phone-number footer-info">+971(52)501-68-16</p>
        </div>
        <div className="store-location">
          <p className="location footer-sub-header">Адреса торгового центру</p>
          <p className="address footer-info">
            м.Харків, вул. Холодногірська 2а, Чесний магазин
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
