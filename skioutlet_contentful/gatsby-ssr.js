const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="gtag-async"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-5X9RQ169S6"
    />,
    <script
      key="gtag-config"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5X9RQ169S6');
        `,
      }}
    />,
  ]);
};
