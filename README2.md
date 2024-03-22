
<p align='center'>
  <a href="https://github.com/cbonoz/frame24"><img src="https://i.ibb.co/h2fwv6V/logo.png" alt="logo" border="0"></a>
</p>

# Framecast P2P

Framecast P2P is a frame app that indexes LivePeer hosted videos on the Graph and displays them in a carousel. When users engage with content, creators can get paid.

Built for the Frameworks 2024 hackathon.

<!-- Demo URL:

Sponsors used:

* frames.js: foundation
* Airstack: social and web3 data for video posters
* graph: index of video content
* Live peer: hosted video content
* Privy?: auth
* Karma3?: video ranking
* Pinata Frame analytics: video engagement

Demo video: -->



## Inspiration
The inspiration behind Greentrace stems from the urgent need to address climate change and promote sustainable practices in supply chains. By leveraging emerging technologies like Distributed Ledger Technology (DLT) and the Hedera Guardian, Greentrace aims to empower consumers and businesses to make informed choices about the products they purchase and the companies they support. The goal is to create a transparent and auditable system that traces the origins of products back to their sustainable creation practices, thus promoting accountability and incentivizing eco-friendly production methods.

## What it does
Greentrace is a two-sided web application designed to facilitate the verification and registration of sustainable practices associated with products. On the verification side, users can upload a product's barcode, which is then scanned to extract the barcode text. This text is matched against the Hedera Guardian to verify the authenticity and sustainability of the product's origins.

On the registration side, businesses can assign a barcode a history record detailing the sustainable practices involved in the creation of the product. This record is stored on the Hedera network and is tamper-sealed using the Hedera Guardian, ensuring its integrity and immutability. Additionally, any green sustainability practices associated with the product are also recorded and stored securely on the DLT.

Anyone that uses the Greentrace policy has free access to the Greentrace web app for either uploading barcodes and their origin material or on the consumer side when viewing products out in the market in real time.

## How we built it

Greentrace leverages Hedera's innovative policies and methodologies to establish a robust framework for ensuring data integrity and accountability in sustainable supply chains. By implementing Hedera policies, Greentrace can securely freeze and tamper-seal sustainability records, guaranteeing their immutability and reliability. This approach not only instills trust in the information stored on the platform but also empowers users to make informed decisions about their purchases, thereby driving forward climate accountability and supporting the mission of Auditable, Discoverable, and Liquid sustainability/ESG assets.

## Repo structure
`/` (root): Main web project
`/methodology`: Methodology and policy for the Greentrace application (linked PR to come)

## How to run

`yarn; yarn dev`

The web project should now be running on port 3000

## Challenges we ran into
- Integrating the barcode reader functionality seamlessly into the web application.
- Ensuring the secure and tamper-proof storage of sustainability records using the Hedera Guardian.
- Designing an intuitive user interface for both the verification and registration sides of the application.

## Accomplishments that we're proud of
- Successfully implementing the barcode scanning feature for product verification.
- Establishing a secure and auditable system for recording sustainable practices using the Hedera Guardian.
- Creating a user-friendly web application that promotes transparency and accountability in supply chains.

## What we learned
- How to integrate third-party libraries and SDKs into web applications effectively.
- The importance of data security and integrity in sustainable supply chain management.
- Strategies for designing and developing user-friendly interfaces for complex applications.

## What's next for Greentrace
- Expanding the database of sustainable practices and certifications to provide more comprehensive information to consumers.
- Integrating additional features such as user reviews and ratings to further enhance transparency and trust in the system.
- Collaborating with manufacturers and retailers to encourage widespread adoption of Greentrace and promote sustainable consumption habits globally.


### Useful links
* Dashboard: https://ethglobal.com/events/frameworks/home
* Sponsors: https://ethglobal.com/events/frameworks

<!--
# Frames.js Starter Kit

This is a boilerplate repo to get started quickly with `frames.js`

## Quickstart

If running from the frames.js repository itself:

- Run `yarn` from the repository root
- Run `cd examples/framesjs-starter`

1. Install dependencies `yarn install`

2. Run the dev server `yarn dev`

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. Edit `app/page.tsx`

5. Visit [http://localhost:3000/debug](http://localhost:3000/debug) to debug your frame.

6. (Optional) To use a real signer (costs warps), copy `.env.sample` to `.env` and fill in the env variables following the comments provided

## Docs, Questions and Help

- [Frames.js Documentation](https://framesjs.org)
- [Awesome frames](https://github.com/davidfurlong/awesome-frames?tab=readme-ov-file)
- Join the [/frames-dev](https://warpcast.com/~/channel/frames-devs) channel on Farcaster to ask questions

## If you get stuck or have feedback, [Message @df please!](https://warpcast.com/df)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy

```bash
vercel
```

more deployment links coming soon, PRs welcome!
-->
