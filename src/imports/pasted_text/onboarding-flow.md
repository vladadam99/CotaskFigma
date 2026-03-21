Build flow

Current:
Signup → Avatar Home

Change it to:
Signup → Avatar Onboarding → Avatar Home

Rule:

If role = avatar and onboardingComplete = false → send to onboarding

If role = avatar and onboardingComplete = true → send to avatar home

1. Create the database fields first

In Firebase / Supabase, your users collection should have at least:

Core

role = "avatar" | "user" | "enterprise"

fullName

email

createdAt

onboardingComplete = false

Avatar profile fields

avatarBioShort

avatarBioLong

skills (list of strings)

customSkills (list of strings)

languages (list of strings)

canTravel (bool)

travelRadiusKm (number)

travelInternational (bool)

equipment (list of strings)

mobilityModes (list of strings)

workingDays (list of strings)

workingHoursStart

workingHoursEnd

timezone

instantBooking (bool)

pricePerMinute

pricePerSession

experienceLevel

yearsExperience

certifications

profilePhotoUrl

introVideoUrl

isVerified = false

That comes first. Otherwise your forms have nowhere real to save.

2. Create these pages in FlutterFlow

Make these pages:

role_select_page

signup_avatar_page

avatar_onboarding_page

avatar_home_page

You can keep onboarding as one page with multiple steps. That is easier.

3. Build avatar_onboarding_page

Use one page and place a PageView or local-state step system inside it.

Best setup:

Top title

Progress bar

Step indicator text

Main form card

Back / Continue buttons

Final Submit button

Create local state variables on the page:

currentStep = 0

selectedSkills = list<string>

selectedLanguages = list<string>

selectedEquipment = list<string>

selectedMobilityModes = list<string>

selectedWorkingDays = list<string>

canTravel = bool

travelInternational = bool

instantBooking = bool

Also bind text fields/controllers for bio, price, experience, etc.

4. Create the onboarding steps
Step 1 — Basic profile

Widgets:

Upload profile photo

Short bio text field

Long description text area

Fields to save:

profilePhotoUrl

avatarBioShort

avatarBioLong

Validation:

short bio required

long bio required

Step 2 — Skills and services

Widgets:

Multi-select choice chips

“Other skill” text input

Optional service tags

Skill chip examples:

City Tours

Travel Guide

Food Tours

Shopping Help

Real Estate Viewings

Local Fixer

Events

Nightlife

Adventure

Teaching

Translation

Custom Requests

Save to:

skills

customSkills

Validation:

at least 1 skill required

Step 3 — Travel and capabilities

Widgets:

Switch: Can travel?

If yes:

Slider or number field for radius

Checkbox: available internationally

Multi-select chips for equipment

Multi-select chips for mobility

Language chips

Equipment:

Meta Glasses

Insta360

Smartphone

Gimbal

Mic

Drone

Laptop / streaming setup

Mobility:

Walking

Car

Bike

Public Transport

Save to:

canTravel

travelRadiusKm

travelInternational

equipment

mobilityModes

languages

Validation:

at least 1 language

at least 1 equipment option

Step 4 — Availability

Widgets:

Day selectors: Mon to Sun

Start time picker

End time picker

Timezone dropdown

Instant booking switch

Save to:

workingDays

workingHoursStart

workingHoursEnd

timezone

instantBooking

Validation:

at least 1 day

start/end time required

Step 5 — Pricing and experience

Widgets:

Price per minute

Price per session

Experience dropdown

Years experience number field

Certifications text area

Experience dropdown:

Beginner

Intermediate

Professional

Expert

Save to:

pricePerMinute

pricePerSession

experienceLevel

yearsExperience

certifications

Validation:

at least one price field required

experience level required

Step 6 — Review and submit

Show a summary:

photo

bio

skills

travel

availability

price

experience

Buttons:

Back

Submit Profile

On submit:

update all avatar fields

set onboardingComplete = true

navigate to avatar_home_page

5. What to do in FlutterFlow for the buttons
After signup button

In signup_avatar_page, current action probably goes straight to home.

Replace it with:

Create account

Create user document

Set:

role = "avatar"

onboardingComplete = false

Navigate to avatar_onboarding_page

Do not send them to home yet.

6. Add app-start routing logic

When user logs in, check their document.

Logic:

if role != avatar → normal flow

if role = avatar and onboardingComplete = false → onboarding

if role = avatar and onboardingComplete = true → avatar home

In FlutterFlow this can be done on app start / auth redirect page using conditional navigation.

7. Best widget choices inside FlutterFlow

Use:

Choice Chips for skills, languages, equipment, days

Switch for travel / instant booking

Time Picker for working hours

TextField / TextFormField for bios and prices

Upload Media for photo/video

Linear Progress Bar for progress

Conditional Visibility to show travel radius only when canTravel = true

8. Recommended page state logic

Progress text:

Step 1 of 6

Step 2 of 6

etc.

Progress bar value:

step 1 = 0.16

step 2 = 0.33

step 3 = 0.50

step 4 = 0.66

step 5 = 0.83

step 6 = 1.00

Continue button action:

validate current step

if valid → currentStep + 1

Back button:

currentStep - 1

You can do this with page state variables and conditional containers.

9. Strongly recommended extra fields

Add these too:

country

city

age18Confirmed = bool

nsfwAllowed = false by default

remoteOnly = bool

passportReady or canTravelAbroad

maxSessionLength

preferredCategories

responseTime

safetyAgreementAccepted = bool

These will help later for filtering and trust.

10. Do not make this mistake

Do not save everything only at the end.

Better:

save after each step
or

keep local state and save at the end, but autosave is better

Best practical version for you:

save step-by-step to database

if app closes, they continue where they left off later

For that, also add:

onboardingStep = number

Then after each step:

update onboardingStep

Example:

completed step 2 → save onboardingStep = 2

11. Exact logic example

After account creation:

create user doc

set role = avatar

set onboardingComplete = false

set onboardingStep = 1

navigate to onboarding

After pressing Continue on step 1:

validate step 1

update database fields for step 1

set onboardingStep = 2

move to step 2

Final submit:

update final fields

set onboardingComplete = true

set onboardingStep = 6

navigate to avatar home

12. My recommendation for your exact app

For CoTask, the avatar onboarding should include these categories from the start:

Tours

Local Guide

Shopping

Real Estate

Dining / Food

Events

Adventure

Virtual Assistance

Teaching / Language Practice

Custom Tasks

That matches your business much better than a generic creator form.

13. What you should build today

Today only do this:

create database fields

create avatar_onboarding_page

change signup redirect

create first 3 steps

test data saving

stop there

Do not try to finish the whole app in one go.

Next, I can give you the exact widget-by-widget layout for each onboarding step, so you can build it in FlutterFlow without guessing.