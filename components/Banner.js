import Script from "next/script";
import { useEffect } from "react";
import { ADSENSE_ID, ADTEST } from "../lib/constants";

const Banner = ({
  className,
  style,
  layout,
  format,
  client = ADSENSE_ID,
  slot,
  responsive,
  layoutKey,
  auto,
}) => {
  useEffect(() => {
    try {
      // let adsbygoogle = window.adsbygoogle || [];
      // adsbygoogle.push({});
      let scripts = document.querySelectorAll(`.ad_`);
      // console.log(`1 scripts:`, scripts);
      for (let i of scripts) {
        // console.log(i);
        i.parentNode.removeChild(i);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  const devMode =
    `${process.env.NODE_ENV}` === `development` || ADTEST === true;
  return (
    <div className="my-4">
      {/* <div className="text-center text-xs uppercase opacity-50">
        Advertisement
      </div> */}
      <div className={className ? className + ` text-center` : `text-center`}>
        <ins
          className={`adsbygoogle`}
          style={
            auto
              ? {
                  display: "inline-block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : style
              ? style
              : { display: "block" }
          }
          data-ad-layout={layout}
          data-ad-format={format ? format : `auto`}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-layout-key={layoutKey}
          data-full-width-responsive={auto ? `true` : responsive}
          {...(devMode ? { "data-adtest": "on" } : null)}
        />
        <Script
          id={Math.random()}
          className={`ad_`}
          dangerouslySetInnerHTML={{
            __html: `
              try {
                (adsbygoogle = window.adsbygoogle || []).push({})
              } catch(e) { console.log(e) }
            `,
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
