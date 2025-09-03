import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type ArticleProps = {
  children: JSX.Element | Array<JSX.Element>;
};
const Article = ({ children }: ArticleProps) => {
  return <Box sx={{ mb: 2, mt: 6 }}>{children}</Box>;
};

type ArticleTitleProps = {
  text: string;
};
const ArticleTitle = ({ text }: ArticleTitleProps) => {
  return (
    <Typography variant="h4" sx={{ mb: 2 }}>
      {text}
    </Typography>
  );
};

type ArticleBodyProps = {
  children: JSX.Element | Array<JSX.Element>;
};
const ArticleBody = ({ children }: ArticleBodyProps) => {
  return <Box sx={{ ml: 2 }}>{children}</Box>;
};

type TextProps = {
  children?: string | JSX.Element | Array<string | JSX.Element>;
};
const Text = ({ children }: TextProps) => {
  return (
    <Typography sx={{ ml: 3, mt: 2 }} variant="body1" fontWeight={"light"}>
      {children}
    </Typography>
  );
};

const PrivacyPage = () => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        Privacy Policy
      </Typography>
      <Box sx={{ mt: 20 }}></Box>
      <Text>Effective as of April 20, 2022</Text>
      <Text>
        This Privacy Policy describes the privacy practices of Mintoria GmbH,
        (“Mintoria”, "MTR", “we”, “us”, or “our”), and how we handle personal
        information that we collect through our digital properties that link to
        this Privacy Policy, including our website (the “Service”) as well as
        through social media, our marketing activities and other activities
        described in this Privacy Policy.
      </Text>

      <Article>
        <ArticleTitle text="Personal Information We Collect" />
        <ArticleBody>
          <Text>
            <b>Personal information artists provide to us.</b> Personal
            information that artists may provide to us through the Service or
            otherwise includes:
          </Text>
          <ul>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Contact information</b>, such as your first and last name,
                email and mailing addresses and phone number, and links to your
                webpage/social media account.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Communications information</b> based on exchanges with you,
                including when you contact us with questions, feedback, or
                otherwise.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Marketing information</b>, such as your preferences for
                receiving our marketing communications and details about your
                engagement with them.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Social media information</b>, such as information you use to
                login to, and posts you make on, our Discord server.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Art-related information</b> about works that you create and
                sell through the Service, such as your username/artist name and
                names and descriptions of your works.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Payment information</b>, such as your Ethereum wallet
                address.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Transaction information</b> such as your sale history.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Government-issued identification</b> numbers such as your tax
                identification number to facilitate monetary payments to/from
                you.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Other information</b> not specifically listed here, which we
                will use as described in this Privacy Policy or as otherwise
                disclosed at the time of collection.
              </Typography>
            </li>
          </ul>

          <Text>
            <b>Personal information users provide to us.</b> Personal
            information that users (meaning digital property visitors) of the
            Service provide to us through the Service or otherwise may include:
          </Text>
          <ul>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Contact information</b> such as your first and last name,
                salutation, email address, billing and mailing addresses, and
                phone number.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Communications information</b> based on exchanges with you,
                including when you contact us with questions, feedback, or
                otherwise.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Marketing information</b> such as your preferences for
                receiving our marketing communications and details about your
                engagement with them.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Social media information</b> such as information you use to
                login to, and posts you make on, our Discord server.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Payment information</b>, such as your Ethereum wallet address
                needed to complete your transactions
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Transaction information</b> such as your purchase and return
                history.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Other information</b> not specifically listed here, which we
                will use as described in this Privacy Policy or as otherwise
                disclosed at the time of collection.
              </Typography>
            </li>
          </ul>

          <Text>
            <b>Third party sources.</b> We may combine personal information we
            receive from you with personal information we obtain from other
            sources, such as social media platforms.
          </Text>

          <Text>
            <b>Automatic data collection. </b>
            We, our service providers, and our business partners may
            automatically log information about you, your computer or mobile
            device, and your interaction over time with the Service, our
            communications and other online services, such as:
          </Text>
          <ul>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Device data</b>, such as your computer’s or mobile device’s
                operating system type and version, manufacturer and model,
                browser type, screen resolution, RAM and disk size, CPU usage,
                device type (e.g., phone, tablet), IP address, unique
                identifiers (including identifiers used for advertising
                purposes), language settings, mobile device carrier,
                radio/network information (e.g., WiFi, LTE, 3G), and general
                location information such as city, state or geographic area.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Online activity data</b>, such as pages or screens you
                viewed, how long you spent on a page or screen, the website you
                visited before browsing to the Service, navigation paths between
                pages or screens, information about your activity on a page or
                screen, access times, and duration of access, and whether you
                have opened our marketing emails or clicked links within them.
              </Typography>
            </li>
          </ul>
          <Text>
            <b>Cookies and similar technologies</b>. Like many online services,
            we may use the following technologies:
          </Text>
          <ul>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Cookies</b> which are text files that websites store on a
                visitor‘s device to uniquely identify the visitor’s browser or
                to store information or settings in the browser for the purpose
                of helping you navigate between pages efficiently, remembering
                your preferences, enabling functionality, helping us understand
                user activity and patterns and facilitating analytics.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Local storage technologies</b>, like HTML5 and Flash, that
                provide cookie-equivalent functionality but can store larger
                amounts of data, including on your device outside of your
                browser in connection with specific applications.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                <b>Web beacons</b>, also known as pixel tags or clear GIFs,
                which are used to demonstrate that a webpage or email was
                accessed or opened, or that certain content was viewed or
                clicked.
              </Typography>
            </li>
          </ul>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="How We Use Your Personal Information" />
        <ArticleBody>
          <Text>
            We may use your personal information for the following purposes or
            as otherwise described at the time of collection:
          </Text>
          <Text>
            <b>Service delivery.</b> We may use your personal information to:
          </Text>
          <ul>
            <li>
              <Typography variant="body1" fontWeight="light">
                provide, operate and improve the Service and our business;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                process your payments and complete transactions with you;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                communicate with you about the Service, including by sending our
                newsletter via email;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                understand your needs and interests, and personalize your
                experience with the Service and our communications; and
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                provide support for the Service, respond to your requests,
                questions and feedback.
              </Typography>
            </li>
          </ul>

          <Text>
            <b>Research and development.</b> We may use your personal
            information for research and development purposes, including to
            analyze and improve the Service and our business. As part of these
            activities, we may create aggregated, de-identified or other
            anonymous data from personal information we collect. We make
            personal information into anonymous data by removing information
            that makes the data personally identifiable to you. We may use this
            anonymous data and share it with third parties for our lawful
            business purposes, including to analyze and improve the Service and
            promote our business.
          </Text>

          <Text>
            <b>Compliance and protection.</b> We may use your personal
            information to:
          </Text>
          <ul>
            <li>
              <Typography variant="body1" fontWeight="light">
                comply with applicable laws, lawful requests, and legal process,
                such as to respond to subpoenas or requests from government
                authorities;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                protect our, your or others’ rights, privacy, safety or property
                (including by making and defending legal claims);
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                audit our internal processes for compliance with legal and
                contractual requirements and internal policies;
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                enforce the terms and conditions that govern the Service; and
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontWeight="light">
                prevent, identify, investigate and deter fraudulent, harmful,
                unauthorized, unethical or illegal activity, including
                cyberattacks and identity theft.
              </Typography>
            </li>
          </ul>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="How we share your personal information" />
        <ArticleBody>
          <Text>
            We may share your personal information with the following parties
            and as otherwise described in this Privacy Policy or at the time of
            collection:
          </Text>
          <Text>
            <b>Service providers.</b> Third parties that provide services on our
            behalf or help us operate the Service or our business (such as
            hosting, information technology, payment processors, customer
            support, email delivery, and website analytics services).
          </Text>
          <Text>
            <b>Professional advisors.</b> Professional advisors, such as
            lawyers, auditors, bankers and insurers, where necessary in the
            course of the professional services that they render to us.
          </Text>
          <Text>
            <b>Authorities and others.</b> Law enforcement, government
            authorities, and private parties, as we believe in good faith to be
            necessary or appropriate for the compliance and protection purposes
            described above.
          </Text>
          <Text>
            <b>Business transferees.</b> Acquirers and other relevant
            participants in business transactions (or negotiations for such
            transactions) involving a corporate divestiture, merger,
            consolidation, acquisition, reorganization, sale or other
            disposition of all or any portion of the business or assets of, or
            equity interests in, Mintoria or our affiliates (including, in
            connection with a bankruptcy or similar proceedings).
          </Text>
          <Text>
            Please keep in mind that whenever you voluntarily make your personal
            information available for viewing by third parties or the public on
            or through our Service, including our Discord server, that
            information can be seen, collected and used by others. We are not
            responsible for any use of such information by others.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="Your choices" />
        <ArticleBody>
          <Text>
            You have the following choices with respect to your personal
            information.
          </Text>
          <Text>
            <b>Cookies. </b>Most browser settings let you delete and reject
            cookies placed by websites. Many browsers accept cookies by default
            until you change your settings. If you do not accept cookies, you
            may not be able to use all functionality of the Service and it may
            not work properly. For more information about cookies, including how
            to see what cookies have been set on your browser and how to manage
            and delete them, visit www.allaboutcookies.org.
          </Text>
          <Text>
            <b>Local storage. </b>You may be able to limit use of HTML5 cookies
            in your browser settings. Unlike other cookies, Flash-based local
            storage cannot be removed or rejected via your browser settings, but
            you can adjust the settings of your Flash player to block it.
            Blocking Flash storage may impede the functionality of Flash
            applications, including those employed by the Service. For more
            information on Flash local storage visit
            https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html
          </Text>
          <Text>
            <b>Analytics.</b> We use Google Analytics to help us understand user
            activity on the Service. You can learn more about Google Analytics
            cookies at
            https://developers.google.com/analytics/resources/concepts/gaConceptsCookies
            and about how Google protects your data at
            http://www.google.com/analytics/learn/privacy.html. You can prevent
            the use of Google Analytics relating to your use of our sites by
            downloading and installing a browser plugin available at
            https://tools.google.com/dlpage/gaoptout?hl=en.
          </Text>
          <Text>
            <b>Do Not Track.</b> Some Internet browsers may be configured to
            send “Do Not Track” signals to the online services that you visit.
            We currently do not respond to “Do Not Track” or similar signals. To
            find out more about “Do Not Track,” please visit
            http://www.allaboutdnt.com.
          </Text>
          <Text>
            <b>Declining to provide information.</b> We need to collect personal
            information to provide certain services. If you do not provide the
            information we identify as required or mandatory, we may not be able
            to provide those services.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="Other sites and services" />
        <ArticleBody>
          <Text>
            The Service may contain links to websites and other online services
            operated by third parties. In addition, our content may be
            integrated into web pages or other online services that are not
            associated with us. These links and integrations are not an
            endorsement of, or representation that we are affiliated with, any
            third party. We do not control websites or online services operated
            by third parties, and we are not responsible for their actions.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="Security" />
        <ArticleBody>
          <Text>
            We employ a number of technical, organizational and physical
            safeguards designed to protect the personal information we collect.
            However, no security measures are failsafe and we cannot guarantee
            the security of your personal information.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="International data transfer" />
        <ArticleBody>
          <Text>
            We are headquartered in Germany and may use service providers that
            operate in other countries. Your personal information may be
            transferred to Germany or locations where privacy laws may not be as
            protective as those in your state, province, or country.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="Children" />
        <ArticleBody>
          <Text>
            The Service is not intended for use by children under 16 years of
            age. If we learn that we have collected personal information through
            the Service from a child under 16 without the consent of the child’s
            parent or guardian as required by law, we will delete it.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="Changes to this Privacy Policy" />
        <ArticleBody>
          <Text>
            We reserve the right to modify this Privacy Policy at any time. If
            we make material changes to this Privacy Policy, we will notify you
            by updating the date of this Privacy Policy and posting it on the
            Service. If required by law we will also provide notification of
            changes in another way that we believe is reasonably likely to reach
            you, such as via email or another manner through the Service. Any
            modifications to this Privacy Policy will be effective upon our
            posting the modified version (or as otherwise indicated at the time
            of posting). In all cases, your use of the Service after the
            effective date of any modified Privacy Policy indicates your
            acceptance of the modified Privacy Policy.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="How to reach us" />
        <ArticleBody>
          <Text>You can reach us by email at contact@mintoria.io.</Text>
        </ArticleBody>
      </Article>
    </>
  );
};

export default PrivacyPage;
