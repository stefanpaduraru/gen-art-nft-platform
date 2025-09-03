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

type ListProps = {
  children: JSX.Element | Array<JSX.Element>;
};
const List = ({ children }: ListProps) => {
  return <ol type="a">{children}</ol>;
};

type ListItemProps = {
  children?: string | JSX.Element | Array<string | JSX.Element>;
};
const ListItem = ({ children }: ListItemProps) => {
  return (
    <li style={{ marginBottom: 10 }}>
      <Typography variant="body1" fontWeight={"light"}>
        {children}
      </Typography>
    </li>
  );
};

type TextProps = {
  children?: string | JSX.Element | Array<string | JSX.Element>;
};
const Text = ({ children }: TextProps) => {
  return (
    <Typography sx={{ ml: 3 }} variant="body1" fontWeight={"light"}>
      {children}
    </Typography>
  );
};

const TermsPage = () => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        Terms of Service
      </Typography>
      <Box sx={{ mt: 20 }}></Box>

      <Article>
        <ArticleTitle text="1. Introduction" />
        <ArticleBody>
          <List>
            <ListItem>
              These Terms of Service (these "Terms") govern your access to and
              use of certain products, services and properties made available by
              Mintoria GmbH ("Mintoria," "MTR,", "we," "us" or "our"). (As used
              herein, the term "you" (including any variant) refers to each
              individual who enters into these Terms on such individual's own
              behalf or any entity on behalf of which an individual enters into
              these Terms.) Our products, services and properties include,
              without limitation, the creation, purchase, sale, exchange, or
              modification of certain digital assets; our online and/or mobile
              services, and software provided on or in connection with those
              services (collectively, the "Service"). Certain features of the
              Service may be subject to additional guidelines, terms, or rules
              ("Supplemental Terms"), which will be displayed in connection with
              such features. All such Supplemental Terms are incorporated by
              reference into these Terms. If these Terms are inconsistent with
              any Supplemental Terms, the Supplemental Terms shall control
              solely with respect to such services.
            </ListItem>
            <ListItem>
              MINTORIA OFFERS A PLATFORM FOR CREATORS, BUYERS, AND SELLERS OF
              DIGITAL ASSETS AND ANY PRODUCTS, SERVICES AND/OR BENEFITS, WHETHER
              DIGITAL OR OTHERWISE, TO BE FURNISHED BY OR ON BEHALF OF SELLERS
              IN CONNECTION WITH SUCH SALES. WE ARE NOT A BROKER, FINANCIAL
              INSTITUTION, OR CREDITOR. THE SERVICE IS AN ADMINISTRATIVE
              PLATFORM ONLY. MINTORIA FACILITATES TRANSACTIONS BETWEEN THE BUYER
              AND SELLER BUT IS NOT A PARTY TO ANY AGREEMENT BETWEEN THE BUYER
              AND SELLER OR OTHERWISE BETWEEN ANY USERS OF THE SERVICE. YOU
              SPECIFICALLY ACKNOWLEDGE AND AGREE THAT, IF YOU USE THE SERVICE TO
              MAKE A PURCHASE, THE SELLER SHALL BE AN INTENDED THIRD-PARTY
              BENEFICIARY OF THESE TERMS WITH RESPECT TO THE ITEM(S) SOLD AND
              SELLER'S RIGHTS WITH RESPECT THERETO. MINTORIA SHALL USE
              COMMERCIALLY REASONABLE EFFORTS TO PROCURE THAT BUYERS SHALL BE AN
              INTENDED THIRD-PARTY BENEFICIARY OF MINTORIA'S AGREEMENT(S) WITH
              SELLERS OF ITEMS FOR THE PURPOSE OF ENFORCING BUYERS' RIGHTS WITH
              RESPECT THERETO. YOU AGREE THAT MINTORIA SHALL NOT BE A PARTY TO
              OR HAVE ANY RESPONSIBILITY OR LIABILITY FOR, ARISING OUT OF,
              RELATING TO, ASSOCIATED WITH OR RESULTING FROM ANY DISPUTES
              BETWEEN YOU AND ANY SELLER OF AN ITEM IN RESPECT OF THE USE,
              MISUSE, PROVISION OR FAILURE TO PROVIDE ANY ITEM.
            </ListItem>
            <ListItem>
              YOU BEAR FULL RESPONSIBILITY FOR VERIFYING THE IDENTITY,
              LEGITIMACY, AND AUTHENTICITY OF ITEMS YOU PURCHASE THROUGH THE
              SERVICES. NOTWITHSTANDING INDICATORS AND MESSAGES THAT SUGGEST
              VERIFICATION, MINTORIA MAKES NO CLAIMS ABOUT THE IDENTITY,
              LEGITIMACY, OR AUTHENTICITY OF ITEMS OFFERED FOR SALE ON OR
              THROUGH THE PLATFORM.
            </ListItem>
            <ListItem>
              PLEASE BE AWARE THAT SECTION 7 OF THESE TERMS, BELOW, CONTAINS
              YOUR OPT-IN CONSENT TO RECEIVE COMMUNICATIONS FROM US, INCLUDING
              EMAIL COMMUNICATION.
            </ListItem>

            <ListItem>
              THESE TERMS OF USE ARE IMPORTANT AND AFFECT YOUR LEGAL RIGHTS, SO
              PLEASE READ THEM CAREFULLY. BY CLICKING ON ANY "I ACCEPT" BUTTON,
              COMPLETING THE ACCOUNT REGISTRATION PROCESS, MINTING OR OFFERING
              ITEMS FOR SALE THROUGH THE SERVICE, PURCHASING ITEMS THROUGH THE
              SERVICE, AND/OR OTHERWISE USING THE SERVICE, YOU AGREE TO BE BOUND
              BY THESE TERMS AND ALL OF THE TERMS INCORPORATED HEREIN BY
              REFERENCE. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS
              OR USE THE SERVICE OR MINT OR PURCHASE ANY ITEMS.
            </ListItem>
            <ListItem>
              Please refer to our Privacy Policy for information about how we
              collect, use and share personal information about you. By
              submitting data through the Service, you expressly consent to the
              collection, use and disclosure of your personal data in accordance
              with the Privacy Policy.
            </ListItem>
            <ListItem>
              Mintoria reserves the right to change or modify these Terms at any
              time and in our sole discretion. If we make changes to these
              Terms, we will provide notice of such changes, such as by sending
              an email notification, providing notice through the Service or
              updating the "Last Updated" date at the beginning of these Terms.
              By continuing to access or use the Service at any point after such
              update, you confirm your acceptance of the revised Terms and all
              of the terms incorporated therein by reference. We encourage you
              to review these Terms frequently to ensure that you understand the
              terms and conditions that apply when you access or use the
              Service. If you do not agree to the revised Terms, you may not
              access or use the Service.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="2. Our service" />
        <ArticleBody>
          <List>
            <ListItem>
              The Service is a software application made available by Mintoria
              to enable users of the Service ("Users") to Mint (as defined
              below) and purchase unique non-fungible tokens and any non-digital
              products, services and/or benefits to be furnished by or on behalf
              of sellers in connect with such sales (collectively, "Items"),
              implemented on the Ethereum Blockchain platform (the "Blockchain
              Platform") using smart contracts. You may only participate in the
              Minting, purchase, or sale of any Item by linking an electronic
              wallet that allows you to purchase, store, and engage in
              transactions using cryptocurrency (each, a "Digital Wallet") on
              supported bridge extensions. Before purchasing an Item, you must
              download a supported Digital Wallet bridge extension and use such
              extension to connect and unlock your Digital Wallet through the
              Service. Once you submit an order to Mint or purchase an Item,
              your order is passed on to the applicable extension, which
              completes the transaction on your behalf.
            </ListItem>
            <ListItem>
              ALL TRANSACTIONS INITIATED THROUGH OUR SERVICE ARE EFFECTED BY
              THIRD-PARTY DIGITAL WALLET EXTENSIONS. BY USING OUR SERVICES YOU
              AGREE THAT SUCH TRANSACTIONS ARE GOVERNED BY THE TERMS OF SERVICE
              AND PRIVACY POLICY FOR THE APPLICABLE EXTENSIONS. FOR METAMASK,
              THOSE TERMS ARE AVAILABLE AT https://metamask.io/terms.html AND
              https://metamask.io/privacy.html.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="3. User representations and warranties" />
        <ArticleBody>
          <List>
            <ListItem>
              You must be eighteen (18) years old to use the Service. By using
              the Service to Mint, purchase, list, or sell an Item, as
              applicable, you agree to (i) provide accurate, current, and
              complete information about yourself, (ii) maintain and promptly
              update from time to time as necessary such information, (iii)
              maintain the security of your Digital Wallet and accept all risks
              of unauthorized access to your Digital Wallet and to the
              information you provide to us, and (iv) immediately notify us if
              you discover or otherwise suspect any security breaches related to
              the Service.
            </ListItem>
            <ListItem>
              You agree that you will not:
              <ul>
                <li>
                  buy, sell, rent, or lease access to the Services without our
                  written permission;
                </li>
                <li>
                  log in or try to log in to access the Service through
                  unauthorized third party applications or clients.
                </li>
              </ul>
            </ListItem>
            <ListItem>
              Mintoria may require you to provide additional information and
              documents at the request of any competent authority or in order to
              help Mintoria comply with applicable law, regulation, or policy,
              including laws related to anti-laundering (legalization) of
              incomes obtained by criminal means, or for counteracting financing
              of terrorism. Mintoria may also require you to provide additional
              information and documents in cases where it has reasons to believe
              that:
              <ul>
                <li>
                  Your Digital Wallet or other access to the Service is being
                  used for money laundering or for any other illegal activity;
                </li>
                <li>
                  You have concealed or reported false identification
                  information and other details; or
                </li>
                <li>
                  Transactions effected via your Digital Wallet were effected in
                  breach of these Terms. In such cases, Mintoria, in its sole
                  discretion, may pause or cancel your transactions until such
                  requested additional information and documents have been
                  reviewed by Mintoria and accepted as satisfying the
                  requirements of applicable law, regulation, or policy. If you
                  do not provide complete and accurate information and documents
                  in response to such a request, Mintoria may refuse to provide
                  any Item, Content (as defined below), product, service and/or
                  further access to the Service to you
                </li>
              </ul>
            </ListItem>
            <ListItem>
              When you use the Service to Mint, purchase, list, or sell an Item,
              you hereby represent and warrant, to and for the benefit of
              Mintoria, its affiliates and its and their respective
              representatives, as follows:
              <ul>
                <li>
                  Authority. You have all requisite capacity, power and
                  authority to enter into, and perform your obligations under
                  these Terms, including to Mint, sell, list, or buy any Items,
                  as applicable. The execution, delivery and performance of, and
                  the performance of your obligations under, these Terms have
                  been duly authorized by all necessary action on the part of
                  you and, if you are an entity, such entity's board of
                  directors or comparable authority(ies), and no other
                  proceedings on your part are necessary to authorize the
                  execution, delivery or performance of your obligations under
                  these Terms by you.
                </li>
                <li>
                  Due Execution. These Terms constitute your legal, valid and
                  binding obligation, enforceable against you in accordance with
                  these Terms.
                </li>

                <li>
                  Accuracy of Background Check Information. All information
                  provided to Mintoria and/or its third-party designees,
                  including its address and social security number or tax ID
                  number, is accurate and complete. None of: (i) you; (ii) any
                  of your affiliates; (iii) any other person having a beneficial
                  interest in you; or (iv) any person for whom you are acting as
                  agent or nominee in connection with these Terms is: (A) a
                  country, territory, entity or individual named on an OFAC list
                  as provided at http://www.treas.gov/ofac, or a Person or
                  entity prohibited under the OFAC programs, regardless of
                  whether or not they appear on the OFAC list; or (B) a senior
                  foreign political figure, or any immediate family member or
                  close associate of a senior foreign political figure.
                </li>
                <li>
                  Non-Contravention. These Terms do not, and the performance of
                  your obligations under these Terms and your Minting, listing,
                  buying, or selling of any Items, as applicable to your use of
                  the Service, will not: (i) if you are an entity, conflict with
                  or violate any of the charter documents of such entity or any
                  resolution adopted by its equity holders or other persons
                  having governance authority over the entity; (ii) contravene,
                  conflict with or violate any right of any third party or any
                  applicable legal requirement to which you or any of the assets
                  owned or used by you, is subject; or (iii) result in any
                  breach of or constitute a default (or an event that with
                  notice or lapse of time or both would become a default) under
                  any material contract or agreement to which you are a party,
                  permit held by you or legal requirement applicable to you.
                </li>
                <li>
                  Independent Investigation and Non-Reliance. You are
                  sophisticated, experienced and knowledgeable in the Minting,
                  listing, buying, or selling of any Items, as applicable.
                  Additionally, you have conducted an independent investigation
                  of the Service and the matters contemplated by these Terms,
                  have formed your own independent judgment regarding the
                  benefits and risks of and necessary and desirable practices
                  regarding the foregoing, and, in making the determination to
                  Mint, list, buy, or sell any Items using the Service, you have
                  relied solely on the results of such investigation and such
                  independent judgement. Without limiting the generality of the
                  foregoing, you understand, acknowledge and agree that the
                  legal requirements pertaining to blockchain technologies and
                  digital assets generally, including the Items, are uncertain,
                  and you have conducted an independent investigation of such
                  potentially applicable legal requirements and the resulting
                  risks and uncertainties, including the risk that one or more
                  governmental entities or other persons may assert that any
                  digital assets or cryptographic tokens (including the Items)
                  may constitute securities under applicable legal requirements.
                  You hereby irrevocably disclaim and disavow reliance upon any
                  statements or representations made by or on behalf of, or
                  information made available by, Mintoria, in determining to
                  enter into these Terms, Mint, list, buy, or sell any Items or
                  use the Service.
                </li>
                <li>
                  Litigation. There is no legal proceeding pending that relates
                  to your activities relating to the Minting of Items or other
                  token- or digital asset- trading or blockchain technology
                  related activities.
                </li>
                <li>
                  Compliance. You have not failed to comply with, and have not
                  violated, any applicable legal requirement relating to any
                  blockchain technologies, token trading activities or Minting
                  Items. No investigation or review by any governmental entity
                  is pending or, to your knowledge, has been threatened against
                  or with respect to you, nor does any government order or
                  action prohibit you or any of your representatives from
                  engaging in or continuing any conduct, activity or practice
                  relating to Minting Items.
                </li>
              </ul>
            </ListItem>
            <ListItem>
              You must provide all equipment and software necessary to connect
              to the Service. You are solely responsible for any fees, including
              Internet connection or mobile fees, that you incur when accessing
              the Service.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="4. Account Registration" />
        <ArticleBody>
          <Text>
            In order to use certain features of the Service you may need to
            register for an account on the Service ("Account"). You must be
            eighteen (18) years old to register for an Account. By creating an
            Account, you agree to (i) provide accurate, current, and complete
            Account information about yourself, (ii) maintain and promptly
            update from time to time as necessary your Account information,
            (iii) maintain the security of your password and of any device used
            for multi-factor authentication, and accept all risks of
            unauthorized access to your Account and (iv) immediately notify us
            if you discover or otherwise suspect any unauthorized access or
            other security breaches related to the Service or your Account. You
            may not have more than one Account, and Mintoria reserves the right
            to block multiple Accounts of the same user.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="5. Minting an Item" />
        <ArticleBody>
          <List>
            <ListItem>
              A creator of generative art ("Creator") may upload a script
              containing or embodying an algorithm (each such script, "Creator
              IP") to the Blockchain Platform. Users may be able to use the
              Service to create or issue ("Mint") on the Blockchain Platform an
              Item generated by the Creator IP. By Minting or purchasing an
              Item, you agree to comply with any terms, including licenses or
              payment rights that are embedded within or otherwise included with
              any Item that you Mint or purchase. Mintoria does not guarantee
              that Items Minted on the Service will be transferable to any other
              platform. You acknowledge and agree that, when you Mint an Item,
              you do not expect to receive and do not receive any rights to the
              algorithm comprising Creator IP.
            </ListItem>
            <ListItem>
              The Creator of any Creator IP may designate at point of upload and
              Mintoria will display at the point of sale 2 (i) how many Items
              may be Minted through the Service from each instance of Creator
              IP; (ii) the terms of the license in the Creator IP that is
              granted to the User who Mints an Item using such Creator IP or any
              subsequent owners of such Item; and (iii) any fee payable in
              connection with any subsequent sale of an Item generated by
              Creator IP (each such sale, a "Secondary Sale," and such fee, a
              "Secondary Sale Fee").
            </ListItem>
            <ListItem>
              The Service is only a marketplace, and Mintoria is not and shall
              not be a party to any transaction or dispute between any Creator
              of Creator IP and any Minter or subsequent owner of an Item
              generated by that Creator's Creator IP, whether arising from any
              rights granted in that Item or otherwise
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="6. Pricing, Fees and Payments" />
        <ArticleBody>
          <List>
            <ListItem>
              All pricing and payment terms for Items are as indicated at point
              of sale or otherwise on the Service, and any payment obligations
              you incur are binding at the time of purchase. You may not
              substitute any other currency, whether cryptocurrency or fiat
              currency, for the currency in which you have contracted to pay at
              the time of purchase. For clarity, no fluctuation in the value of
              any currency, whether cryptocurrency or otherwise, shall impact or
              excuse your obligations with respect to any purchase.
            </ListItem>
            <ListItem>
              When you Mint an Item, you agree that you have read, understand,
              and agree to be bound by any terms and conditions applicable to
              the Secondary Sale of that Item, including any Secondary Sale Fee
              (regardless of whether such Secondary Sale Fee is enforced or
              supported by the third-party platform or marketplace that
              facilitates a Secondary Sale). You further agree that you will
              bind any subsequent purchaser of the Item to such Secondary Sale
              terms and conditions
            </ListItem>
            <ListItem>
              Mintoria may add or change any payment processing services at any
              time. Such services may be subject to additional terms or
              conditions. Whether a particular cryptocurrency is accepted as a
              payment method by Mintoria is subject to change at any time in
              Mintoria'sole discretion.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="7. Consent to Electronic Communication" />
        <ArticleBody>
          <Text>
            By providing Mintoria with your email address or by using the
            Service to Mint, purchase, list, or sell an Item, you consent to
            receive electronic communications from Mintoria (e.g., via email or
            by posting notices to the Service). These communications may include
            notices about your use of the Service (e.g., transactional
            information) and are part of your relationship with us. You agree
            that any notices, agreements, disclosures or other communications
            that we send to you electronically will satisfy any legal
            communication requirements, including, but not limited to, that such
            communications be in writing. You should maintain copies of
            electronic communications from us by printing a paper copy or saving
            an electronic copy. We have no obligation to store for your later
            use or access any such electronic communications that we make to
            you. We may also send you promotional communications via email,
            including, but not limited to, newsletters, special offers, surveys
            and other news and information we think will be of interest to you.
            You may opt out of receiving these promotional emails at any time by
            following the unsubscribe instructions provided therein.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="8. Ownership" />
        <ArticleBody>
          <List>
            <ListItem>
              Unless otherwise indicated in writing by us, the Service and all
              content and other materials contained therein, including, without
              limitation, the Mintoria logo and all designs, text, graphics,
              pictures, information, data, software, sound files, other files
              and the selection and arrangement thereof (collectively,
              "Content") are the proprietary property of Mintoria or our
              affiliates, licensors or Users, as applicable.
            </ListItem>
            <ListItem>
              Notwithstanding anything to the contrary in these Terms, the
              Service and Content may include software components provided by
              Mintoria or its affiliates or a third party that are subject to
              separate license terms, in which case those license terms will
              govern such software components
            </ListItem>
            <ListItem>
              The Mintoria logo and any Mintoria product or service names, logos
              or slogans that may appear on the Service are trademarks of
              Mintoria or our affiliates and may not be copied, imitated or
              used, in whole or in part, without our prior written permission.
              You may not use any metatags or other "hidden text" utilizing
              "Mintoria" or any other name, trademark or product or service name
              of Mintoria or our affiliates without our prior written
              permission. In addition, the look and feel of the Service and
              Content, including, without limitation, all page headers, custom
              graphics, button icons and scripts, constitute the service mark,
              trademark or trade dress of Mintoria and may not be copied,
              imitated or used, in whole or in part, without our prior written
              permission. All other trademarks, registered trademarks, product
              names and other names or logos mentioned on the Service are the
              property of their respective owners and may not be copied,
              imitated or used, in whole or in part, without the permission of
              the applicable trademark holder. Reference to any products,
              services, processes or other information by name, trademark,
              manufacturer, supplier or otherwise does not constitute or imply
              endorsement, sponsorship or recommendation by Mintoria.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="9. Licenses to Our Service and Content" />
        <ArticleBody>
          <List>
            <ListItem>
              You are hereby granted a limited, revocable, nonexclusive,
              nontransferable, non-assignable, non-sublicensable, "as-is"
              license to access and use the Service and Content for your own
              personal, non-commercial use; provided, however, that such license
              is subject to these Terms and does not include any right to (i)
              sell, resell, or use commercially the Service or Content, (ii)
              distribute, publicly perform, or publicly display any Content,
              (iii) modify or otherwise make any derivative uses of the Service
              or Content, or any portion thereof, (iv) use any data mining,
              robots, or similar data gathering or extraction methods, (v)
              download (other than page caching) any portion of the Service or
              Content, except as expressly permitted by us, and (vi) use the
              Service or Content other than for their intended purposes. This
              license is subject to your compliance with the Acceptable Use
              Policy set forth in Section 12 below.
            </ListItem>
            <ListItem>
              You are granted a limited, nonexclusive, nontransferable right to
              create a text hyperlink to the Service for noncommercial purposes,
              provided that such link does not portray Mintoria or our
              affiliates or any of our Services, Content, products or services
              in a false, misleading, derogatory or otherwise defamatory manner,
              and provided further that the linking site does not contain any
              adult or illegal material or any material that is offensive,
              harassing or otherwise objectionable in Mintoria' sole discretion.
              This limited right may be revoked at any time. You may not use a
              logo or other proprietary graphic of Mintoria to link to the
              Service or Content without our express written permission.
              Further, you may not use, frame or utilize framing techniques to
              enclose any Mintoria trademark, logo or other proprietary
              information, including the images found on the Service, the
              content of any text or the layout or design of any page, or form
              contained on a page, on the Service without our express written
              consent.
            </ListItem>
            <ListItem>
              Mintoria may from time-to-time change or discontinue any or all
              aspects or features of the Service, including by (i) altering the
              smart contracts which are included in the Blockchain Platform
              pursuant to upgrades, forks, security incident responses or chain
              migrations, (ii) deactivating or deleting User Content that
              Mintoria in its sole discretion determines has been abandoned; or
              (iii) repossessing any Items Mintoria in its sole discretion
              determines have been abandoned. In such events, you may no longer
              be able to access, interact with or, read the data from the
              Service.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="10. User Content" />
        <ArticleBody>
          <Text>
            Certain Content may be made available by a User on or through the
            Service ("User Content"). If you choose to make User Content
            available on or through the Service, you hereby grant Mintoria a
            fully paid, royalty-free, worldwide, non-exclusive right (including
            any moral rights) and license to use, sublicense, distribute,
            reproduce, modify, adapt, and display, such User Content (in whole
            or in part) for the purposes of (i) providing the Service, including
            making User Content available to other Users in accordance with your
            elections on the Service; and (ii) improving the Service. You also
            hereby grant each other User of the Service a non-exclusive license
            to access your User Content through the Service, and to use,
            reproduce, distribute, display and perform such User Content solely
            as permitted through the functionality of the Service and under
            these Terms. You are solely responsible for any User Content you
            provide. You represent and warrant that you have, or have obtained,
            all rights, licenses, consents, permissions, power and/or authority
            necessary to grant the rights granted herein for any User Content
            that you submit, post or display on or through the Service. You
            agree that such User Content will not contain material subject to
            copyright or other proprietary rights, unless you have necessary
            permission or are otherwise legally entitled to post the material
            and to grant the licenses described above. We take no responsibility
            for the User Content posted or listed via the Service, although we
            reserve the right to remove any User Content that is in violation of
            these Terms.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="11. Third-Party Services; Third-Party Terms" />
        <ArticleBody>
          <List>
            <ListItem>
              The Service may contain links to third-party properties
              ("Third-Party Properties") and applications ("Third-Party
              Applications"). When you click on a link to a Third-Party Property
              or Third-Party Application, you are subject to the terms and
              conditions (including privacy policies) of another property or
              application. Such Third-Party Properties and Third-Party
              Applications and are not under the control of Mintoria. Mintoria
              is not responsible for any Third-Party Properties or Third-Party
              Applications. Mintoria provides links to these Third-Party
              Properties and Third-Party Applications only as a convenience and
              does not review, approve, monitor, endorse, warrant, or make any
              representations with respect to Third-Party Properties or
              Third-Party Applications, or their products or services. You use
              all links in Third-Party Properties, and Third-Party Applications
              at your own risk. When you leave our Service, our Terms and
              policies no longer govern. You should review all applicable
              agreements and policies, including privacy and data gathering
              practices, of any Third-Party Properties or Third-Party
              Applications, and should make whatever investigation you feel
              necessary or appropriate before proceeding with any transaction
              with any third party
            </ListItem>
            <ListItem>
              The Service and Content may include components, including software
              components, that are provided by a third party and that are
              subject to separate license terms, in which case those license
              terms will govern your access to and use of such components. For
              example, when you click to get more details about an Item, you may
              see a link to the Third-Party Property from which such Item
              originated. Our Service and/or any Third-Party Property may
              include terms governing the use of such Item, including license
              terms. In the event you purchase such Item through our
              marketplace, you are required to comply with the terms that govern
              such Item, which may be different from these Terms.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="12. Acceptable Use Policy" />
        <ArticleBody>
          <Text>
            You agree that you are solely responsible for your conduct while
            participating in the purchase or sale of Items or otherwise
            accessing or using the Service. You agree that you will abide by
            these Terms and will not:
          </Text>
          <List>
            <ListItem>
              Provide false or misleading information to Mintoria;
            </ListItem>
            <ListItem>
              Use or attempt to use another User's linked Digital Wallet without
              authorization from such User and Mintoria;
            </ListItem>
            <ListItem>Create or list counterfeit Items;</ListItem>
            <ListItem>Pose as another person;</ListItem>
            <ListItem>
              Use the Service in any manner that could interfere with, disrupt,
              negatively affect or inhibit other Users from fully enjoying the
              Service, or that could damage, disable, overburden or impair the
              functioning of the Service in any manner;
            </ListItem>
            <ListItem>
              Develop, utilize, or disseminate any software, or interact with
              any API in any manner, that could damage, harm, or impair the
              Service;
            </ListItem>
            <ListItem>
              Reverse engineer any aspect of the Service, or do anything that
              might discover source code or bypass or circumvent measures
              employed to prevent or limit access to any service, area, or code
              of the Service;
            </ListItem>
            <ListItem>
              Attempt to circumvent any content-filtering techniques we employ,
              or attempt to access any feature or area of the Service that you
              are not authorized to access;
            </ListItem>
            <ListItem>
              Use any robot, spider, crawler, scraper, script, browser
              extension, offline reader, or other automated means or interface
              not authorized by us to access the Service, extract data or
              otherwise interfere with or modify the rendering of Service pages
              or functionality;
            </ListItem>
            <ListItem>
              Collect or harvest data from our Service that would allow you to
              contact individuals, companies, or other persons or entities, or
              use any such data to contact such entities;
            </ListItem>
            <ListItem>
              Use data collected from our Service for any direct marketing
              activity (including without limitation, email marketing, SMS
              marketing, telemarketing, and direct marketing);
            </ListItem>
            <ListItem>
              Bypass or ignore instructions that control all automated access to
              the Service;
            </ListItem>
            <ListItem>
              Use the Service for any illegal or unauthorized purpose, or engage
              in, encourage, or promote any activity that violates any
              applicable law or these Terms;
            </ListItem>
            <ListItem>
              Use the Blockchain Platform to carry out any illegal activities in
              connection with or in any way related to your access to and use of
              the Service, including but not limited to money laundering,
              terrorist financing or deliberately engaging in activities
              designed to adversely affect the performance of the Blockchain
              Platform, or the Service;
            </ListItem>
            <ListItem>
              Engage in or knowingly facilitate any "front-running," "wash
              trading," "pump and dump trading," "ramping," "cornering" or
              fraudulent, deceptive or manipulative trading activities,
              including:
              <ul>
                <li>
                  trading an Item at successively lower or higher prices for the
                  purpose of creating or inducing a false, misleading or
                  artificial appearance of activity in such Item, unduly or
                  improperly influencing the market price for such Item trading
                  on the Service or establishing a price which does not reflect
                  the true state of the market in such Item;
                </li>
                <li>
                  for the purpose of creating or inducing a false or misleading
                  appearance of activity in an Item or creating or inducing a
                  false or misleading appearance with respect to the market in
                  an Item: (A) executing or causing the execution of any
                  transaction in an Item which involves no material change in
                  the beneficial ownership thereof; or (B) entering any order
                  for the purchase or sale of an Item with the knowledge that an
                  order of substantially the same size, and at substantially the
                  same price, for the sale of such Item, has been or will be
                  entered by or for the same or different parties; or
                </li>
                <li>
                  participating in, facilitating, assisting or knowingly
                  transacting with any pool, syndicate or joint account
                  organized for the purpose of unfairly or deceptively
                  influencing the market price of an Item;
                </li>
              </ul>
            </ListItem>
            <ListItem>
              Use the Service to carry out any financial activities subject to
              registration or licensing, including but not limited to using the
              Service to transact in securities, commodities futures, trading of
              commodities on a leveraged, margined or financed basis, binary
              options (including prediction-market transactions), real estate or
              real estate leases, equipment leases, debt financings, equity
              financings or other similar transactions;
            </ListItem>
            <ListItem>
              Use the Service to participate in fundraising for a business,
              protocol, or platform, including but not limited to creating,
              listing, or buying assets that (i) are redeemable for financial
              instruments, (ii) give owners rights to participate in an ICO or
              any securities offering, or (iii) entitle owners to financial
              rewards, including but not limited to, DeFi yield bonuses, staking
              bonuses, and burn discounts; or
            </ListItem>
            <ListItem>
              Mint an Item or Items with the expectation of receiving a
              particular element, configuration, aspect, or other feature of
              such Item, or otherwise Mint an Item in an attempt to secure or
              with the expectation of receiving added or enhanced value due to
              such element, configuration, aspect, or other feature of that
              Item.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="13. Listing Guidelines" />
        <ArticleBody>
          <List>
            <ListItem>
              Mintoria has the right, but not the obligation, to remove any
              listing at any time. Mintoria exercises its sole judgment in
              allowing or disallowing certain assets, listings, smart contracts,
              and collections.
            </ListItem>
            <ListItem>
              Items, listings, smart contracts, collections, and other User
              Content that Mintoria in its sole discretion deems inappropriate,
              disruptive, or illegal are prohibited on the Service. Mintoria
              reserves the right, but not the obligation, to determine the
              appropriateness of listings on its site and remove any User
              Content, including any listing, at any time. If you create or
              offer an Item, listing, smart contract, or collection in violation
              of these policies, we reserve the right to take corrective
              actions, as appropriate, including but not limited to removing the
              asset, listing, smart contract, or collection, deleting your User
              Content, recouping any payments that have been made to you for
              such Item, and permanently withholding any other payments due and
              owed to you. Mintoria reserves the right to destroy inappropriate
              or illegal metadata stored on our servers.
            </ListItem>
            <ListItem>
              The following User Content is prohibited on the Service, whether
              included in or made available in or through Items, listings, smart
              contracts, or collections that include metadata, or otherwise:
              <ul>
                <li>
                  Content that violates international or Germany intellectual
                  property laws;
                </li>
                <li>
                  Content that promotes suicide or self-harm, incites hate or
                  violence against others, degrades or doxes another individual,
                  depicts minors in sexually suggestive situations, or is
                  otherwise illegal in Germany;
                </li>
                <li>
                  Content with a primary or substantial purpose in a game or
                  application that violates international or Germany
                  intellectual property laws, promotes suicide or self-harm,
                  incites hate or violence against others, degrades or doxes
                  another individual, depicts minors in sexually suggestive
                  situations, or is otherwise illegal in Germany;
                </li>
                <li>
                  Content created or used primarily or substantially for the
                  purpose of raising funds for known terrorist organizations (as
                  listed on
                  https://www.state.gov/foreign-terrorist-organizations/ or as
                  may be determined by Mintoria from time to time in its sole
                  discretion);
                </li>
                <li>
                  Content that, as determined in our sole and absolute
                  discretion, is NSFW, and other Content that is intended to be
                  age-restricted. Item names, listings and their descriptions,
                  smart contract names, and collections including profanity or
                  overtly sexual Content are prohibited. A smart contract that
                  contains NSFW Content is subject to being marked NSFW, even if
                  the NSFW Content only represents a portion of the Content on
                  the smart contract;
                </li>
                <li>
                  Content that includes stolen assets, assets taken without
                  authorization, and otherwise illegally obtained assets, all
                  including but not limited to Items. Listing illegally obtained
                  Items may result in your listings being cancelled, your Items
                  being hidden, or your access to the Service being suspended If
                  you have reason to believe that an asset listed on the Service
                  was illegally obtained, please contact us immediately; and
                </li>
                <li>
                  Content that is illegal or offensive, or Content that includes
                  or uses profanity or graphic language
                </li>
              </ul>
              <Text>
                If you become aware of the creation, listing, or buying of
                assets in violation of any of the terms specified in this
                section, please contact us at contact@mintoria.io to report it.
              </Text>
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="14. Copyright" />
        <ArticleBody>
          <Text>
            Mintoria retains the absolute right to terminate access to the
            Service for and remove the User Content of any User who violates or
            infringes the rights of ours or of any third party. Without limiting
            the foregoing, if you believe that your intellectual property has
            been used on the Service in a way that constitutes infringement,
            please provide our Copyright Agent with the following information:
          </Text>
          <ul>
            <li>
              an electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright interest;
            </li>
            <li>
              a description of the copyrighted work that you claim has been
              infringed;
            </li>
            <li>
              a description of the location on the Service of the material that
              you claim is infringing;
            </li>
            <li>your address, telephone number and e-mail address;</li>
            <li>
              a written statement by you that you have a good faith belief that
              the disputed use is not authorized by the copyright owner, its
              agent or the law; and
            </li>
            <li>
              a statement by you, made under penalty of perjury, that the above
              information in your notice is accurate and that you are the
              copyright owner or authorized to act on the copyright owner's
              behalf.
            </li>
          </ul>
          <Text>Such information may be sent to hello@Mintoria</Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="15. Investigations" />
        <ArticleBody>
          <Text>
            If Mintoria becomes aware of any possible violations by you of these
            Terms, Mintoria reserves the right to investigate such violations.
            If, as a result of the investigation, Mintoria believes that
            criminal activity may have occurred, Mintoria reserves the right to
            refer the matter to, and to cooperate with, any and all applicable
            legal authorities. Mintoria is entitled, except to the extent
            prohibited by applicable law, to disclose any information or
            materials on or in the Service, including User Content, in Mintoria'
            possession in connection with your use of the Service, to (i) comply
            with applicable laws, legal process or governmental request; (ii)
            enforce these Terms, (iii) respond to any claims that User Content
            violates the rights of third parties, (iv) respond to your requests
            for customer service, or (v) protect the rights, property or
            personal safety of Mintoria, its Users, or the public, and all law
            enforcement or other government officials, as Mintoria in its sole
            discretion believes to be necessary or appropriate. By agreeing to
            these Terms, you hereby provide your irrevocable consent to such
            monitoring. You acknowledge and agree that you have no expectation
            of privacy concerning your use of the Service, including without
            limitation text, voice, or video communications.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="16. Release" />
        <ArticleBody>
          <Text>
            You hereby release and forever discharge Mintoria and our officers,
            employees, agents, successors, and assigns (the "Mintoria Entities")
            from, and hereby waive and relinquish, each and every past, present
            and future dispute, claim, controversy, demand, right, obligation,
            liability, action and cause of action of every kind and nature
            (including personal injuries, death, and property damage), that has
            arisen or arises directly or indirectly out of, or that relates
            directly or indirectly to, the Service (including any interactions
            with, or act or omission of, other Users of the Service or any
            Third-Party Properties). IF YOU ARE A CALIFORNIA RESIDENT, YOU
            HEREBY WAIVE CALIFORNIA CIVIL CODE SECTION 1542 IN CONNECTION WITH
            THE FOREGOING, WHICH STATES: "A GENERAL RELEASE DOES NOT EXTEND TO
            CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS
            OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY
            HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH
            THE DEBTOR."
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="17. Assumption of Risk Related to Items" />
        <ArticleBody>
          <Text>You acknowledge and agree that:</Text>
          <List>
            <ListItem>
              The prices of digital assets are extremely volatile. Fluctuations
              in the price of other digital assets could materially and
              adversely affect the Items, which may also be subject to
              significant price volatility. We cannot and do not guarantee that
              any purchasers of Items will not lose money.
            </ListItem>
            <ListItem>
              You are solely responsible for determining what, if any, taxes
              apply to your transactions involving Items. Neither Mintoria nor
              any other Mintoria Entity is responsible for determining the taxes
              that may apply to transactions involving Items.
            </ListItem>
            <ListItem>
              Items exist and can be transferred only by virtue of the ownership
              record maintained on the blockchain supporting such Items.
            </ListItem>
            <ListItem>
              There are risks associated with using digital currency and digital
              assets, including but not limited to, the risk of hardware,
              software and Internet connections, the risk of malicious software
              introduction, and the risk that third parties may obtain
              unauthorised access to your information.
            </ListItem>
            <ListItem>
              The legal and regulatory regime governing blockchain technologies,
              cryptocurrencies, and tokens is uncertain, and new regulations or
              policies may materially adversely affect the development of the
              Service and the utility of Items.
            </ListItem>
            <ListItem>
              There are risks associated with purchasing user-generated Content,
              including but not limited to, the risk of purchasing counterfeit
              assets, mislabeled assets, assets that are vulnerable to metadata
              decay, assets on smart contracts with bugs, and assets that may
              become untransferable.
            </ListItem>
            <ListItem>
              Mintoria reserves the right to hide collections, contracts, and
              assets that Mintoria suspects or believes may violate these Terms.
              Items you purchase may become inaccessible on the Service. Under
              no circumstances shall the inability to access or view your assets
              on the Service serve as grounds for a claim against Mintoria.
            </ListItem>
            <ListItem>
              Mintoria has no responsibility for the Items Minted, sold, bought
              or traded on the Service. Mintoria does not investigate and cannot
              guarantee or warrant the authenticity, originality, uniqueness,
              marketability, legality or value of any Item created or traded on
              the Service. For the avoidance of doubt, Mintoria shall have no
              responsibility for any failure of any User to comply with any
              terms regarding the authenticity, originality, uniqueness,
              scarcity or other description or characteristics of the Item or
              Creator IP furnished by or on behalf of that User and displayed by
              Mintoria on the Service.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="18. Indemnification" />
        <ArticleBody>
          <Text>
            To the fullest extent permitted by applicable law, you agree to
            indemnify, defend, and hold harmless Mintoria and the Mintoria
            Entities from and against all actual or alleged third party claims,
            damages, awards, judgments, losses, liabilities, obligations,
            penalties, interest, fees, expenses (including, without limitation,
            attorneys' fees and expenses) and costs (including, without
            limitation, court costs, costs of settlement, and costs of or
            associated with pursuing indemnification and insurance), of every
            kind and nature whatsoever arising out of or related to these Terms
            or your use of the Service, whether known or unknown, foreseen or
            unforeseen, matured or unmatured, or suspected or unsuspected, in
            law or equity, whether in tort, contract or otherwise (collectively,
            "Claims"), including, but not limited to, damages to property or
            personal injury, that are caused by, arise out of or are related to
            (a) your use or misuse of the Service, User Content or Items, (b)
            any feedback you provide, (c) your violation of these Terms, and (d)
            your violation of the rights of any third party, including another
            user. You agree to promptly notify Mintoria of any third-party
            Claims and cooperate with the Mintoria Entities in defending such
            Claims. You further agree that the Mintoria Entities shall have
            control of the defense or settlement of any third-party Claims. THIS
            INDEMNITY IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER
            INDEMNITIES SET FORTH IN A SEPARATE WRITTEN AGREEMENT BETWEEN YOU
            AND Mintoria.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="19. Disclaimers" />
        <ArticleBody>
          <List>
            <ListItem>
              THE SERVICE, CONTENT CONTAINED THEREIN, AND ITEMS LISTED THEREIN
              ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT
              WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              Mintoria (AND ITS SUPPLIERS) MAKE NO WARRANTY THAT THE SERVICE:
              (A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN
              UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS; OR (C) WILL BE
              ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE. Mintoria DISCLAIMS
              ALL OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING,
              WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
              NON-INFRINGEMENT AS TO THE SERVICE OR ANY CONTENT CONTAINED
              THEREIN. Mintoria DOES NOT REPRESENT OR WARRANT THAT CONTENT ON
              THE SERVICE IS ACCURATE, COMPLETE, RELIABLE, CURRENT, OR
              ERROR-FREE. WE WILL NOT BE LIABLE FOR ANY LOSS OF ANY KIND FROM
              ANY ACTION TAKEN OR TAKEN IN RELIANCE ON MATERIAL OR INFORMATION,
              CONTAINED ON THE SERVICE. WHILE Mintoria ATTEMPTS TO MAKE YOUR
              ACCESS TO AND USE OF THE SERVICE AND CONTENT SAFE, Mintoria CANNOT
              AND DOES NOT REPRESENT OR WARRANT THAT THE SERVICE, CONTENT, OR
              ANY ITEMS LISTED ON OUR SERVICE OR OUR SERVERS ARE FREE OF VIRUSES
              OR OTHER HARMFUL COMPONENTS. WE CANNOT GUARANTEE THE SECURITY OF
              ANY DATA THAT YOU DISCLOSE ONLINE. YOU ACCEPT THE INHERENT
              SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER
              THE INTERNET AND WILL NOT HOLD US RESPONSIBLE FOR ANY BREACH OF
              SECURITY UNLESS IT IS DUE TO OUR GROSS NEGLIGENCE.
            </ListItem>
            <ListItem>
              WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU
              SUSTAIN AS A RESULT OF YOUR USE OF THE SERVICE. WE TAKE NO
              RESPONSIBILITY FOR, AND WILL NOT BE LIABLE TO YOU FOR, ANY USE OF
              ITEMS, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS
              ARISING FROM: (I) USER ERROR SUCH AS FORGOTTEN PASSWORDS,
              INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED ADDRESSES; (II)
              SERVER FAILURE OR DATA LOSS; (III) CORRUPTED DIGITAL WALLET FILES;
              (IV) UNAUTHORISED ACCESS TO APPLICATIONS; OR (V) ANY UNAUTHORISED
              THIRD PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF
              VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST
              THE SERVICE OR ITEMS.
            </ListItem>
            <ListItem>
              FROM TIME TO TIME, Mintoria MAY OFFER NEW "BETA" FEATURES OR
              TOOLS. SUCH FEATURES OR TOOLS ARE OFFERED "AS IS" AND WITH ALL
              FAULTS, SOLELY FOR EXPERIMENTAL PURPOSES AND WITHOUT ANY WARRANTY
              OF ANY KIND, AND MAY BE MODIFIED OR DISCONTINUED AT Mintoria's
              SOLE DISCRETION. THE PROVISIONS OF THIS SECTION APPLY WITH FULL
              FORCE TO SUCH FEATURES OR TOOLS.
            </ListItem>
            <ListItem>
              ITEMS ARE INTANGIBLE DIGITAL ASSETS. THEY EXIST ONLY BY VIRTUE OF
              THE OWNERSHIP RECORD MAINTAINED IN THE BLOCKCHAIN NETWORK. ANY
              TRANSFER OF TITLE THAT MIGHT OCCUR IN ANY UNIQUE DIGITAL ASSET
              OCCURS ON THE DECENTRALISED LEDGER WITHIN THE APPLICABLE
              BLOCKCHAIN PLATFORM. WE DO NOT GUARANTEE THAT Mintoria OR ANY
              Mintoria ENTITY CAN EFFECT THE TRANSFER OF TITLE OR RIGHT IN ANY
              ITEMS. WE CANNOT AND DO NOT GUARANTEE THAT ANY ITEM WILL HAVE OR
              RETAIN ANY INHERENT VALUE, OR THAT YOU WILL BE ABLE TO SELL OR
              RESELL ANY ITEM PURCHASED THROUGH THE SERVICE.
            </ListItem>
            <ListItem>
              Mintoria is not responsible for any losses or harms sustained by
              you due to vulnerability or any kind of failure, abnormal behavior
              of software (e.g., wallet, smart contract), blockchains, or any
              other features of or inherent to the Items. Mintoria is not
              responsible for casualties due to developers or representatives
              delay or failure to report any issues with any blockchain
              supporting Items, including without limitation forks, technical
              node issues, or any other issues that result in losses of any
              sort. Nothing in these Terms shall exclude or limit liability of
              either party for fraud, death or bodily injury caused by
              negligence, violation of laws, or any other activity that cannot
              be limited or excluded under the laws applicable to your
              jurisdiction.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="20. Dispute Resolution and Arbitration" />
        <Text>
          Dispute Resolution. Please read the arbitration agreement in this
          Section ("Arbitration Agreement") carefully. It contains procedures
          for MANDATORY BINDING ARBITRATION AND A CLASS ACTION WAIVER.
        </Text>
        <ArticleBody>
          <List>
            <ListItem>
              Applicability of Arbitration Agreement. You agree that all claims
              and disputes (excluding claims for injunctive or other equitable
              relief as set forth below) in connection with these Terms or the
              use of any Service provided by Mintoria that cannot be resolved
              informally or in small claims court shall be resolved by binding
              arbitration on an individual basis under the terms of this
              Arbitration Agreement. Unless otherwise agreed to, all arbitration
              proceedings shall be held in English. This Arbitration Agreement
              applies to you and Mintoria, and to any subsidiaries, affiliates,
              agents, employees, predecessors in interest, successors, and
              assigns, as well as all authorized or unauthorized users or
              beneficiaries of services or goods provided under these Terms.
            </ListItem>
            <ListItem>
              Notice Requirement and Informal Dispute Resolution. Before either
              party may seek arbitration, the party must first send to the other
              party a written notice describing the nature and basis of the
              claim or dispute and the requested relief ("Notice of Dispute"). A
              Notice of Dispute to Mintoria should be sent to:
              contact@mintoria.io. After the Notice of Dispute is received, you
              and Mintoria may attempt to resolve the claim or dispute
              informally. If you and Mintoria do not resolve the claim or
              dispute within thirty (30) days after the Notice of Dispute is
              received, either party may begin an arbitration proceeding. The
              amount of any settlement offer made by any party may not be
              disclosed to the arbitrator until after the arbitrator has
              determined the amount of the award, if any, to which either party
              is entitled.
            </ListItem>
            <ListItem>
              Arbitration Rules. Arbitration shall be initiated through an
              established alternative dispute resolution provider ("ADR
              Provider") that offers arbitration as set forth in this section
              and the parties shall agree to select the ADR Provider. The rules
              of the ADR Provider shall govern all aspects of the arbitration,
              including but not limited to the method of initiating and/or
              demanding arbitration, except to the extent such rules are in
              conflict with these Terms. The arbitration shall be conducted by a
              single, neutral arbitrator. Any claims or disputes where the total
              amount of the award sought is less than Ten Thousand Euros (EUR
              10,000.00) may be resolved through binding non-appearance-based
              arbitration, at the option of the party seeking relief. For claims
              or disputes where the total amount of the award sought is Ten
              Thousand Euros (EUR 10,000.00) or more, the right to a hearing
              will be determined by the Arbitration Rules. Any hearing will be
              held in a location within 100 kilometers of your residence, unless
              you reside outside of Germany, and unless the parties agree
              otherwise. If you reside outside of the U.S., the arbitrator shall
              give the parties reasonable notice of the date, time and place of
              any oral hearings. Any judgment on the award rendered by the
              arbitrator may be entered in any court of competent jurisdiction.
              If the arbitrator grants you an award that is greater than the
              last settlement offer that Mintoria made to you prior to the
              initiation of arbitration, Mintoria will pay you the greater of
              the award or EUR2,500.00. Each party shall bear its own costs
              (including attorney's fees) and disbursements arising out of the
              arbitration and shall pay an equal share of the fees and costs of
              the ADR Provider.
            </ListItem>
            <ListItem>
              Additional Rules for Non-Appearance Based Arbitration. If
              non-appearance based arbitration is elected, the arbitration shall
              be conducted by telephone, online and/or based solely on written
              submissions; the specific manner shall be chosen by the party
              initiating the arbitration. The arbitration shall not involve any
              personal appearance by the parties or witnesses unless otherwise
              agreed by the parties.
            </ListItem>
            <ListItem>
              Time Limits. If you or Mintoria pursues arbitration, the
              arbitration action must be initiated and/or demanded within the
              statute of limitations (i.e., the legal deadline for filing a
              claim).
            </ListItem>
            <ListItem>
              Authority of Arbitrator. If arbitration is initiated, the
              arbitrator will decide the rights and liabilities, if any, of you
              and Mintoria, and the dispute will not be consolidated with any
              other matters or joined with any other cases or parties. The
              arbitrator shall have exclusive authority to (i) determine the
              scope and enforceability of this Arbitration Agreement; and (ii)
              resolve any dispute related to the interpretation, applicability,
              enforceability or formation of this Arbitration Agreement
              including, but not limited to, any claim that all or any part of
              this Arbitration Agreement is void or voidable; and shall also
              have the authority to grant motions dispositive of all or part of
              any claim. The exceptions to the preceding sentence are (1) all
              disputes arising out of or relating to the class action waiver,
              including any claim that all or part of the class action waiver is
              unenforceable, illegal, void or voidable, or such class action
              waiver has been breached, shall be decided by a court of competent
              jurisdiction and not by an arbitrator; all disputes arising out of
              or relating to the payment of arbitration fees shall be decided
              only by a court of competent jurisdiction and not by an
              arbitrator; and all disputes arising out of or relating to whether
              either party has satisfied any condition precedent to arbitration
              shall be decided only by a court of competent jurisdiction and not
              by an arbitrator. The arbitrator shall have the authority to award
              monetary damages, and to grant any non-monetary remedy or relief
              available to an individual under applicable law, the AAA Rules,
              and these Terms. The arbitrator shall issue a written award and
              statement of decision describing the essential findings and
              conclusions on which the award is based, including the calculation
              of any damages awarded. The arbitrator has the same authority to
              award relief on an individual basis that a judge in a court of law
              would have. The award of the arbitrator is final and binding upon
              you and Mintoria. Any judgment on the award rendered by the
              arbitrator may be entered in any court of competent jurisdiction.
            </ListItem>
            <ListItem>
              Waiver of Jury Trial. THE PARTIES HEREBY WAIVE THEIR
              CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A
              TRIAL IN FRONT OF A JUDGE OR A JURY, instead electing that all
              claims and disputes shall be resolved by arbitration under this
              Arbitration Agreement. Arbitration procedures are typically more
              limited, more efficient and less costly than rules applicable in a
              court and are subject to very limited review by a court. In the
              event any litigation should arise between you and Mintoria in any
              state or federal court in a suit to vacate or enforce an
              arbitration award or otherwise, YOU AND Mintoria WAIVE ALL RIGHTS
              TO A JURY TRIAL, instead electing that the dispute be resolved by
              a judge.
            </ListItem>
            <ListItem>
              Waiver of Class or Consolidated Actions. ALL CLAIMS AND DISPUTES
              WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED
              OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS, AND
              CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR
              LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER
              OR USER. If a decision is issued stating that applicable law
              precludes enforcement of any of this subsection's limitations as
              to a given claim for relief, then the claim must be severed from
              the arbitration and brought into the federal or state court
              located in Berlin, DE. All other claims shall be arbitrated.
            </ListItem>
            <ListItem>
              Confidentiality. All aspects of the arbitration proceeding,
              including but not limited to the award of the arbitrator and
              compliance therewith, shall be strictly confidential. The parties
              agree to maintain confidentiality unless otherwise required by
              law. This paragraph shall not prevent a party from submitting to a
              court of law any information necessary to enforce this Agreement,
              to enforce an arbitration award, or to seek injunctive or
              equitable relief.
            </ListItem>
            <ListItem>
              Severability. If any part or parts of this Arbitration Agreement
              are found under the law to be invalid or unenforceable by a court
              of competent jurisdiction, then such specific part or parts shall
              be of no force and effect and shall be severed and the remainder
              of the Arbitration Agreement shall continue in full force and
              effect
            </ListItem>
            <ListItem>
              Right to Opt Out. You have the right to opt out of this
              Arbitration Agreement by sending written notice of your decision
              to opt out to: contact@mintoria.io. Such notice must be given
              within 30 days after first becoming subject to a version of these
              Terms containing an arbitration provision. Your notice must
              include your name and address, the email address you used to
              interact with the Service, and an unequivocal statement that you
              want to opt out of this Arbitration Agreement. If you opt out of
              arbitration, all other parts of these Terms will continue to apply
              to you. Opting out of arbitration has no effect on any other
              arbitration agreements that you may currently have, or may enter
              into in the future, with us.
            </ListItem>
            <ListItem>
              Right to Waive. Any or all of the rights and limitations set forth
              in this Arbitration Agreement may be waived by the party against
              whom the claim is asserted. Such waiver shall not waive or affect
              any other portion of this Arbitration Agreement.
            </ListItem>
            <ListItem>
              Survival of Agreement. This Arbitration Agreement will survive the
              termination of your relationship with Mintoria.
            </ListItem>
            <ListItem>
              Small Claims Court. Notwithstanding the foregoing, either you or
              Mintoria may bring an individual action in small claims court.
            </ListItem>
            <ListItem>
              Emergency Equitable Relief. Notwithstanding the foregoing, either
              party may seek emergency equitable relief before a state or
              federal court in order to maintain the status quo pending
              arbitration. A request for interim measures shall not be deemed a
              waiver of any other rights or obligations under this Arbitration
              Agreement.
            </ListItem>
            <ListItem>
              Claims Not Subject to Arbitration. Notwithstanding the foregoing,
              claims of defamation, violation of the Computer Fraud and Abuse
              Act, and infringement or misappropriation of the other party's
              patent, copyright, trademark or trade secrets shall not be subject
              to this Arbitration Agreement.
            </ListItem>
            <ListItem>
              Courts. In any circumstances where the foregoing Arbitration
              Agreement permits the parties to litigate in court, the parties
              hereby agree to submit to the personal jurisdiction of the courts
              located within Berlin, DE for such purpose.
            </ListItem>
          </List>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="21. Limitation of Liability" />
        <ArticleBody>
          <Text>
            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL Mintoria BE
            LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFIT OR ANY
            INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE
            DAMAGES ARISING FROM THESE TERMS, THE SERVICE, ANY ITEMS, OR FOR ANY
            DAMAGES RELATED TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF
            BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, OR
            LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
            BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF
            Mintoria HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS
            TO, AND USE OF, THE SERVICE IS UNDERTAKEN BY YOU AT YOUR OWN
            DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
            DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA
            RESULTING THEREFROM. NOTWITHSTANDING ANYTHING TO THE CONTRARY
            CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY
            OF Mintoria ARISING OUT OF OR IN ANY WAY RELATED TO THESE TERMS,
            YOUR ACCESS TO AND USE OF THE SERVICE, CONTENT (INCLUDING YOUR
            CONTENT), OR ANY ITEMS PURCHASED OR SOLD THROUGH THE SERVICE EXCEED
            THE GREATER OF (A) $100 OR (B) THE AMOUNT PAID TO Mintoria BY YOU
            FOR THE SERVICE IN THE TRANSACTION OR INCIDENT THAT IS THE SUBJECT
            OF THE CLAIM. Some jurisdictions do not allow the exclusion or
            limitation of incidental or consequential damages, so the above
            limitation or exclusion may not apply to you.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="22. General" />
        <ArticleBody>
          <Text>
            We reserve the right in our sole discretion to modify, suspend, or
            discontinue the Service, or any features or parts thereof, whether
            temporarily or permanently, at any time with or without notice to
            you in our sole discretion. These Terms, and your access to and use
            of the Service, shall be governed by and construed and enforced in
            accordance with the laws of Germany, without regard to any conflict
            of law rules or principles that would cause the application of the
            laws of any other jurisdiction. Any dispute between the parties that
            is not subject to arbitration or cannot be heard in small claims
            court, shall be resolved in the courts of Germany. Notwithstanding
            anything contained in these Terms, we reserve the right, without
            notice and in our sole discretion, to terminate your right to access
            or use the Service at any time and for any or no reason, and you
            acknowledge and agree that we shall have no liability or obligation
            to you in such event and that you will not be entitled to a refund
            of any amounts that you have already paid to us, to the fullest
            extent permitted by applicable law. If any term, clause or provision
            of these Terms is held invalid or unenforceable, then that term,
            clause or provision will be severable from these Terms and will not
            affect the validity or enforceability of any remaining part of that
            term, clause or provision, or any other term, clause or provision of
            these Terms. Your relationship to Mintoria is that of an independent
            contractor, and neither party is an agent or partner of the other.
            These Terms, and any rights and licenses granted hereunder, may not
            be transferred or assigned by you without the prior written consent
            of Mintoria. Mintoria's failure to assert any right or provision
            under these Terms shall not constitute a waiver of such right or
            provision. Except as otherwise provided herein, these Terms are
            intended solely for the benefit of Mintoria and you and are not
            intended to confer third party beneficiary rights upon any other
            person or entity.
          </Text>
        </ArticleBody>
      </Article>

      <Article>
        <ArticleTitle text="23. Contact" />
        <ArticleBody>
          <Text>contact@mintoria.io</Text>
        </ArticleBody>
      </Article>
    </>
  );
};

export default TermsPage;
