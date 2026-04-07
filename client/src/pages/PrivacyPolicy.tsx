import styles from "./styles/PrivacyPolicy.module.css";

const toc = [
  { id: "infocollect",    label: "What Information Do We Collect?" },
  { id: "infouse",        label: "How Do We Process Your Information?" },
  { id: "whoshare",      label: "When and With Whom Do We Share Your Personal Information?" },
  { id: "cookies",       label: "Do We Use Cookies and Other Tracking Technologies?" },
  { id: "inforetain",    label: "How Long Do We Keep Your Information?" },
  { id: "infosafe",      label: "How Do We Keep Your Information Safe?" },
  { id: "infominors",    label: "Do We Collect Information from Minors?" },
  { id: "privacyrights", label: "What Are Your Privacy Rights?" },
  { id: "DNT",           label: "Controls for Do-Not-Track Features" },
  { id: "uslaws",        label: "Do United States Residents Have Specific Privacy Rights?" },
  { id: "policyupdates", label: "Do We Make Updates to This Notice?" },
  { id: "contact",       label: "How Can You Contact Us About This Notice?" },
  { id: "request",       label: "How Can You Review, Update, or Delete the Data We Collect?" },
];

const piCategories = [
  { letter: "A", category: "Identifiers", examples: "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name", collected: "NO" },
  { letter: "B", category: "Personal information as defined in the California Customer Records statute", examples: "Name, contact information, education, employment, employment history, and financial information", collected: "NO" },
  { letter: "C", category: "Protected classification characteristics under state or federal law", examples: "Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data", collected: "NO" },
  { letter: "D", category: "Commercial information", examples: "Transaction information, purchase history, financial details, and payment information", collected: "NO" },
  { letter: "E", category: "Biometric information", examples: "Fingerprints and voiceprints", collected: "NO" },
  { letter: "F", category: "Internet or other similar network activity", examples: "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements", collected: "NO" },
  { letter: "G", category: "Geolocation data", examples: "Device location", collected: "NO" },
  { letter: "H", category: "Audio, electronic, sensory, or similar information", examples: "Images and audio, video or call recordings created in connection with our business activities", collected: "NO" },
  { letter: "I", category: "Professional or employment-related information", examples: "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us", collected: "NO" },
  { letter: "J", category: "Education Information", examples: "Student records and directory information", collected: "NO" },
  { letter: "K", category: "Inferences drawn from collected personal information", examples: "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics", collected: "NO" },
  { letter: "L", category: "Sensitive personal Information", examples: "", collected: "NO" },
];

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>PRIVACY POLICY</h1>
      <p className={styles.subtitle}>Last updated April 06, 2026</p>

      <p className={styles.body}>
        This Privacy Notice for <strong>PhysicalChem</strong> ("we," "us," or "our") describes how and why we
        might access, collect, store, use, and/or share ("process") your personal information when you use our
        services ("Services"), including when you:
      </p>
      <ul className={styles.list}>
        <li>Visit our website at <a className={styles.link} href="https://physicalchem.org/">https://physicalchem.org/</a> or any website of ours that links to this Privacy Notice</li>
        <li>Engage with us in other related ways, including any marketing or events</li>
      </ul>
      <p className={styles.body}>
        <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy
        rights and choices. We are responsible for making decisions about how your personal information is processed.
        If you do not agree with our policies and practices, please do not use our Services. If you still have any
        questions or concerns, please contact us at{" "}
        <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>.
      </p>

      <h2 className={styles.heading1}>SUMMARY OF KEY POINTS</h2>
      <p className={styles.body}>
        <strong><em>This summary provides key points from our Privacy Notice, but you can find out more details
        about any of these topics by clicking the link following each key point or by using our{" "}
        <a className={styles.link} href="#toc">table of contents</a> below to find the section you are looking
        for.</em></strong>
      </p>
      <p className={styles.body}><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a className={styles.link} href="#personalinfo">personal information you disclose to us</a>.</p>
      <p className={styles.body}><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.</p>
      <p className={styles.body}><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
      <p className={styles.body}><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a className={styles.link} href="#infouse">how we process your information</a>.</p>
      <p className={styles.body}><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about <a className={styles.link} href="#whoshare">when and with whom we share your personal information</a>.</p>
      <p className={styles.body}><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure. Learn more about <a className={styles.link} href="#infosafe">how we keep your information safe</a>.</p>
      <p className={styles.body}><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a className={styles.link} href="#privacyrights">your privacy rights</a>.</p>
      <p className={styles.body}><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>
      <p className={styles.body}>Want to learn more about what we do with any information we collect? <a className={styles.link} href="#toc">Review the Privacy Notice in full</a>.</p>

      <h2 className={styles.heading1} id="toc">TABLE OF CONTENTS</h2>
      <ol className={styles.tocList}>
        {toc.map((item, i) => (
          <li key={item.id}>
            <a className={styles.link} href={`#${item.id}`}>{i + 1}. {item.label.toUpperCase()}</a>
          </li>
        ))}
      </ol>

      {/* 1 */}
      <h2 className={styles.heading1} id="infocollect">1. WHAT INFORMATION DO WE COLLECT?</h2>
      <h3 className={styles.heading2} id="personalinfo">Personal information you disclose to us</h3>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em></p>
      <p className={styles.body}>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
      <p className={styles.body}><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
      <ul className={styles.list}>
        <li>Email addresses</li>
      </ul>
      <p className={styles.body}><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
      <p className={styles.body}>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

      <h3 className={styles.heading2}>Information automatically collected</h3>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>
      <p className={styles.body}>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.</p>
      <p className={styles.body}>Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: <a className={styles.link} href="https://website_name/cookies.com">https://website_name/cookies.com</a>.</p>
      <p className={styles.body}>The information we collect includes:</p>
      <ul className={styles.list}>
        <li><em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).</li>
      </ul>

      {/* 2 */}
      <h2 className={styles.heading1} id="infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em></p>
      <p className={styles.body}><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>
      <ul className={styles.list}>
        <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
        <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
        <li><strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
      </ul>

      {/* 3 */}
      <h2 className={styles.heading1} id="whoshare">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We may share information in specific situations described in this section and/or with the following third parties.</em></p>
      <p className={styles.body}>We may need to share your personal information in the following situations:</p>
      <ul className={styles.list}>
        <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
      </ul>

      {/* 4 */}
      <h2 className={styles.heading1} id="cookies">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We may use cookies and other tracking technologies to collect and store your information.</em></p>
      <p className={styles.body}>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
      <p className={styles.body}>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders.</p>
      <p className={styles.body}>To the extent these online tracking technologies are deemed to be a "sale"/"sharing" under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section <a className={styles.link} href="#uslaws">"DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"</a></p>
      <p className={styles.body}>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <a className={styles.link} href="https://website_name/cookies.com">https://website_name/cookies.com</a>.</p>

      {/* 5 */}
      <h2 className={styles.heading1} id="inforetain">5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>
      <p className={styles.body}>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
      <p className={styles.body}>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

      {/* 6 */}
      <h2 className={styles.heading1} id="infosafe">6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
      <p className={styles.body}>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>

      {/* 7 */}
      <h2 className={styles.heading1} id="infominors">7. DO WE COLLECT INFORMATION FROM MINORS?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>We do not knowingly collect data from or market to children under 18 years of age.</em></p>
      <p className={styles.body}>We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>.</p>

      {/* 8 */}
      <h2 className={styles.heading1} id="privacyrights">8. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em></p>
      <p className={styles.body}><strong><u>Withdrawing your consent:</u></strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section <a className={styles.link} href="#contact">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</a> below.</p>
      <p className={styles.body}>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
      <h3 className={styles.heading2}>Account Information</h3>
      <p className={styles.body}>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
      <ul className={styles.list}>
        <li>Log in to your account settings and update your user account.</li>
      </ul>
      <p className={styles.body}>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
      <p className={styles.body}><strong><u>Cookies and similar technologies:</u></strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. For further information, please see our Cookie Notice: <a className={styles.link} href="https://website_name/cookies.com">https://website_name/cookies.com</a>.</p>
      <p className={styles.body}>If you have questions or comments about your privacy rights, you may email us at <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>.</p>

      {/* 9 */}
      <h2 className={styles.heading1} id="DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
      <p className={styles.body}>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>
      <p className={styles.body}>California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.</p>

      {/* 10 */}
      <h2 className={styles.heading1} id="uslaws">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.</em></p>
      <h3 className={styles.heading2}>Categories of Personal Information We Collect</h3>
      <p className={styles.body}>The table below shows the categories of personal information we have collected in the past twelve (12) months. For a comprehensive inventory of all personal information we process, please refer to the section <a className={styles.link} href="#infocollect">"WHAT INFORMATION DO WE COLLECT?"</a></p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Examples</th>
              <th>Collected</th>
            </tr>
          </thead>
          <tbody>
            {piCategories.map((row) => (
              <tr key={row.letter}>
                <td><strong>{row.letter}.</strong> {row.category}</td>
                <td>{row.examples}</td>
                <td className={styles.collected}>{row.collected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.body}>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
      <ul className={styles.list}>
        <li>Receiving help through our customer support channels;</li>
        <li>Participation in customer surveys or contests; and</li>
        <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
      </ul>
      <h3 className={styles.heading2}>Your Rights</h3>
      <p className={styles.body}>You have rights under certain US state data protection laws. These rights include:</p>
      <ul className={styles.list}>
        <li><strong>Right to know</strong> whether or not we are processing your personal data</li>
        <li><strong>Right to access</strong> your personal data</li>
        <li><strong>Right to correct</strong> inaccuracies in your personal data</li>
        <li><strong>Right to request</strong> the deletion of your personal data</li>
        <li><strong>Right to obtain a copy</strong> of the personal data you previously shared with us</li>
        <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
        <li><strong>Right to opt out</strong> of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling</li>
      </ul>
      <h3 className={styles.heading2}>How to Exercise Your Rights</h3>
      <p className={styles.body}>To exercise these rights, you can contact us by emailing us at <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>, or by referring to the contact details at the bottom of this document.</p>
      <h3 className={styles.heading2}>Appeals</h3>
      <p className={styles.body}>Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>. We will inform you in writing of any action taken or not taken in response to the appeal. If your appeal is denied, you may submit a complaint to your state attorney general.</p>
      <h3 className={styles.heading2}>California "Shine The Light" Law</h3>
      <p className={styles.body}>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section <a className={styles.link} href="#contact">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</a></p>

      {/* 11 */}
      <h2 className={styles.heading1} id="policyupdates">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
      <p className={styles.body}><strong><em>In Short:</em></strong> <em>Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
      <p className={styles.body}>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>

      {/* 12 */}
      <h2 className={styles.heading1} id="contact">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
      <p className={styles.body}>If you have questions or comments about this notice, you may email us at <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>
      </p>

      {/* 13 */}
      <h2 className={styles.heading1} id="request">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
      <p className={styles.body}>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please email us at <a className={styles.link} href="mailto:hello@physicalchem.org">hello@physicalchem.org</a>.</p>
    </div>
  );
}