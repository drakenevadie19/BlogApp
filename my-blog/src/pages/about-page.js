const AboutPage = () => {
    return (
        <>
            <div id="about-me-page">
                <a href="https://thanh-nguyen-do-portfolio.vercel.app/" target="_blank" rel="noreferrer">Go to my portfolio app</a>
                <div id="main-info">
                    <div id="education">
                        <h1>Education</h1>
                        <details>
                            <summary>Tran Phu Highschool for the gifted - Class of 2021</summary>
                            <ul>
                                <li>Mathematics Major</li>
                                <li>GPA: 3.8/4.0 (9.5/10.0)</li>
                            </ul>
                        </details>
                        <details>
                            <summary>Texas Christian University - Class of 2025</summary>
                            <ul>
                                <li>Bachelor of Computer Science && Mathematics minor</li>
                                <li>GPA: 3.6/4.0</li>
                            </ul>
                        </details>
                    </div>

                    <div id="experience">
                    <h1>Working Experience</h1>
                    <details>
                        <summary>TCU Undergraduate Teacher Assistant Aug 2023-present</summary>
                        <ul>
                            <li>Assist over 50 students with lab projects in Computer Science courses: Data Structures,
                            Techniques in Programming, Python for Data Analytics, and Introduction to Programming.</li>
                            <li>Improve students' programming proficiency and exam performance by 35% through tailored
                            teaching methods customized for each student's learning style and skill level.</li>
                            <li>Host weekly 4-hour Computer Science Help Desk session.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>FPT Software (Working remotely in VietNam) Jun 2023-Aug 2023</summary>
                        <ul>
                            <li>Developed interactive and responsive user interfaces using reusable <strong>Angular.js </strong>components for web-based applications,
                            based on design specifications provided in <strong>Figma</strong></li>
                            <li>Deliver features including managing email/text, set appointment, track messages, calls,
                            and mails by harnessing existing APIs of <strong>Django</strong> and <strong>Python</strong>.</li>
                            <li>Worked in a team, using <strong>Agile</strong> development methodologies to efficiently plan, develop, and test the application.</li>
                        </ul>
                    </details>
                </div>

                <div id="extra-curricular-activities">
                    <h1>Extracurricular Activities</h1>
                    <details>
                        <summary>Mary Cout Burnett Library - IC Desk Assistant</summary>
                        <p>Deals with the students' demands of studying devices.</p>
                    </details>
                    <details>
                        <summary>VSA Board of Logistics 2023-2024</summary>
                        <ul>
                            <li>Applied previous experiences of being a member of Logistics team, I managed the VSA logistics team of 25 members to prepare probs, and set up the stage for events of VSA.</li>
                            <li>With excellent stage performances as well as careful good preparation, AVN 2023: ALO events attracted about 280 attendees, in order to spread beauty of Vietnamese culture.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>VSA Volunteer 2023-2024</summary>
                        <ul>
                            <li>In this position in VSA, I work with a team of 10 people to prepare probs, and set up events for VSA, as well as game leaders.</li>
                            <li>With excellent stage performances and good preparation, our AVN 2022: Chiasma events attracted about 300 attendees and received Texas Christian University’s Outstanding event award in 2022.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>GPA CAMP - Summer 2022</summary>
                        <p>Tackling growing kids' problems and leading them in the race with other teams to the champions. My "Synergy" team was the Champion of Lagi Camps (July 4th- July 11th) and I was selected to be the Best Counselor in this camp.</p>
                    </details>
                </div>
            </div>

            {/* <div id="my-image">
                <div id="image-holder">
                <img class="image" src="../../../../../../assets/aboutme-page/NguyenDT27_Đỗ Thành Nguyên.jpg" alt="">
                </div>
            </div> */}
        </div>
    </>
    );
}

export default AboutPage;