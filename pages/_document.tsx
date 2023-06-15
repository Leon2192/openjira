import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.watsonAssistantChatOptions = {
                  integrationID: "c71ad436-476e-4765-a010-3ede2809c564", // The ID of this integration.
                  region: "us-east", // The region your integration is hosted in.
                  serviceInstanceID: "5640a3b2-9ee2-4df3-a29e-96ca6da3fb0b", // The ID of your service instance.
                  onLoad: function(instance) { instance.render()}
                };
              `,
            }}
          />
          <script
            src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js"
            async
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
