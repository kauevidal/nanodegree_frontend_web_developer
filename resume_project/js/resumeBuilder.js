var bio = {
    name: "Kauê Vidal",
    role: "Web Developer",
    contacts: {
        mobile: "1111-1111",
        email: "email@example.com",
        github: "https://www.github.com",
        twitter: "https://www.twitter.com",
        location: "São Paulo, SP"
    },
    welcomeMessage: "Lorem ipsum dolor sit amet",
    skills: ["Java", "Web", "Front End"],
    biopic: "images/profile.jpg",

    display: function() {

        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
        var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

        $("#header").prepend(formattedRole);
        $("#header").prepend(formattedName);
        $("#header").append(formattedPic);
        $("#header").append(formattedWelcomeMsg);

        var formattedContacts = [];
        formattedContacts.push(HTMLmobile.replace("%data%", bio.contacts.mobile));
        formattedContacts.push(HTMLemail.replace("%data%", bio.contacts.email));
        formattedContacts.push(HTMLtwitter.replace("%data%", bio.contacts.twitter));
        formattedContacts.push(HTMLgithub.replace("%data%", bio.contacts.github));
        formattedContacts.push(HTMLlocation.replace("%data%", bio.contacts.location));

        formattedContacts.forEach(function(contact) {

            $("#topContacts").append(contact);
            $("#footerContacts").append(contact);
        });

        if (bio.skills.length > 0) {

            $("#header").append(HTMLskillsStart);

            bio.skills.forEach(function(skill) {

                var formattedSkill = HTMLskills.replace("%data%", skill);
                $("#skills").append(formattedSkill);
            });
        }
    }
};

var education = {
    schools: [{
            name: "School 01",
            location: "São Caetano",
            degree: "Degree 01",
            majors: ["Major 01", "Major 02"],
            dates: "2015-2017",
            url: "https://www.udacity.com"
        },
        {
            name: "School 02",
            location: "São Caetano",
            degree: "Degree 02",
            majors: ["Major 03", "Major 04"],
            dates: "2014-2015",
            url: "https://www.udacity.com"
        }
    ],
    onlineCourses: [{
            title: "Course Online 01",
            school: "online school 1",
            dates: "2015-2016",
            url: "https://www.udacity.com"
        },
        {
            title: "Course online 01",
            school: "Online school 2",
            dates: "2016-2017",
            url: "https://www.udacity.com"
        }
    ],
    display: function() {

        education.schools.forEach(function(school) {

            var formattedName = HTMLschoolName.replace("%data%", school.name);
            var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
            var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
            var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
            var formattedMajors = HTMLschoolMajor.replace("%data%", school.majors.join(", "));

            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(formattedName + formattedDegree + formattedDates +
                formattedLocation + formattedMajors);
        });

        if (education.onlineCourses.length > 0) {

            $("#education").append(HTMLonlineClasses);

            education.onlineCourses.forEach(function(course) {

                var formattedTitle = HTMLonlineTitle.replace("%data%", course.title);
                var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
                var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
                var formattedUrl = HTMLonlineURL.replace("%data%", course.url);

                $("#education").append(HTMLschoolStart);
                $(".education-entry:last").append(formattedTitle + formattedSchool +
                    formattedDates + formattedUrl);
            });
        }
    }
};

var work = {
    jobs: [{
            employer: "Employer 01",
            title: "Work 01",
            location: "São Paulo, SP",
            dates: "2010-2012",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet"
        },
        {
            employer: "Employer 02",
            title: "Work 02",
            location: "São Paulo, SP",
            dates: "2012-2016",
            description: "Aliquam id justo sed justo porta semper. Vestibulum tincidunt arcu metus, a porttitor est luctus sit amet. Mauris vel erat mauris. Integer tincidunt ipsum eget massa sollicitudin"
        }
    ],
    display: function() {

        work.jobs.forEach(function(job) {

            var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedDates = HTMLworkDates.replace("%data%", job.dates);
            var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
            var formattedDescription = HTMLworkDescription.replace("%data%", job.description);

            $("#workExperience").append(HTMLworkStart);
            $(".work-entry:last").append(formattedEmployer + formattedTitle + formattedDates +
                formattedLocation + formattedDescription);
        });
    }
};

var projects = {
    projects: [{
            title: "Project 01",
            dates: "2011-2012",
            description: "First project",
            images: ["images/project_image.jpg", "images/project_image.jpg"]
        },
        {
            title: "Project 02",
            dates: "2012-2014",
            description: "Second project",
            images: ["images/project_image.jpg"]
        }
    ],
    display: function() {

        projects.projects.forEach(function(projectObject) {

            var projectImages = projectObject.images;
            var formattedImages = [];
            var formattedTitle = HTMLprojectTitle.replace("%data%", projectObject.title);
            var formattedDates = HTMLprojectDates.replace("%data%", projectObject.dates);
            var formattedDescription = HTMLprojectDescription.replace("%data%", projectObject.description);

            projectImages.forEach(function(url) {

                formattedImages.push(HTMLprojectImage.replace("%data%", url));
            });

            $("#projects").append(HTMLprojectStart);
            $(".project-entry:last").append(formattedTitle + formattedDates +
                formattedDescription + formattedImages.join(" "));
        });
    }
};

bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap);