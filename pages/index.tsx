const axios = require("axios");
const HttpsProxyAgent = require("https-proxy-agent");
const qs = require("qs");
import Script from "next/script";
import Image from "next/image";

type PaymentProps = {
  checkoutId: string;
};

export default function Payment(props: PaymentProps) {
  const { checkoutId } = props;
  return (
    <>
      <Script
        src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
      />
        <Image src="/payment.svg" width={400} height={400} alt="Pay Online" />
        <div>
          Payment for Checkout <pre>{checkoutId}</pre>
          <form
            className="paymentWidgets"
            action="http://localhost:3000/result"
            method="POST"
            data-brands="PAYPAL"
          ></form>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  // use corporate proxy if needed
  var httpsAgentObj = process.env.https_proxy ? {httpsAgent: new HttpsProxyAgent(process.env.https_proxy)} : {};

  // use demo data for newn checkout
  var data = qs.stringify({
    entityId: "8a829418530df1d201531299e097175c",
    amount: "1.23",
    currency: "EUR",
    paymentType: "DB",
  });
  let res = null;
  try {
    res = await axios({
      method: "post",
      url: `${process.env.PAYON_API}/v1/checkouts`,
      proxy: false,
      ...httpsAgentObj,
      headers: {
        Authorization: `Bearer ${process.env.PAYON_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    });
    console.log(JSON.stringify(res.data));
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      checkoutId: res.data.id,
    }, // will be passed to the page component as props
  };
}
