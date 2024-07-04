
# Notesheet Management System (**NMS**)

**NMS** is a web based notesheet management system for faculties to manage notesheet 

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#Features">Features</a>
    </li>
    <li>
      <a href="#Installation">Installation</a>
    </li>
    <li>
      <a href="#Environment-Variables">Environment Variables</a>
    </li>
    <li>
      <details>
        <summary><a href="#Documentation">Documentation</a></summary>
        <ol> 
          <li>
            <a href="#Routes">Routes</a>
          </li>
          <li>
            <a href="#Pages">Pages</a>
          </li>
          <li>
            <a href="#Hooks">Hooks</a>
          </li>
          <li>
            <a href="#Styles">Styles</a>
          </li>
          <li>
            <a href="#Component-Usage-Tree">Component Usage Tree</a>
          </li>
          <li>
            <a href="#Data-Provider">Data Provider</a>
          </li>
          <li>
            <a href="#URL">URL</a>
          </li>
        </ol>
      </details>
    </li>
    <li>
      <a href="#Color-Reference-for-Notesheet-Status">Color Reference for Notesheet Status</a>
    </li>
    <li>
      <a href="#Contributors">Contributors</a>
    </li>
  </ol>
</details>



## Features

- Login/Logout/Check Profile of User
- Create/Edit Notesheet
- Search for Notesheets by Title
- View/Approve/Revert/ Notesheet
- Add Normal/Private Notesheet 
- Cross platform



## Installation

Clone the project
```bash
git clone https://github.com/Hiya-Ghosh/task-master.git
```

Go to the project directory

```bash
cd task-master
```

Install dependencies

```bash
npm install
```

Start the server
```bash
npm start
```

Runs the app in the development mode.\
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.




## Environment-Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BASE_URL`


## Documentation
### Routes
[`Routes.jsx`](./src/Routes.jsx) contains available Routes
| Route | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/home/created` | `Protected` | Displays the notesheet created by **User**  |
| `/home/approval` | `Protected` | Displays the notesheet for approval  |
| `/home/notesheet` | `Protected` | Displays the details of the notesheet  |
| `/home/create` | `Protected` | Create Notesheet Page  |
| `/home/edit` | `Protected` | Edit Notesheet Page  |
| `/admin` | `Protected` | Add Users Page *(only admins can access)*  |
| `/profile` | `Protected` | View profile of **User**  |
| `/logout` | `Protected` | Logout  |

<br/>

### Pages
[Pages](./src/pages) folder contains all the  page components.
| Route | Page     |
| :-------- | :------- |
| `/home/created` | `CreatedPage.jsx` |
| `/home/approval` | `ApproverPage.jsx` |
| `/home/notesheet` | `NotesheetDetailPage.jsx` |
| `/home/create` | `NotesheetCreatePage.jsx` |
| `/home/edit` | `NotesheetEditPage.jsx` |
| `/admin` | `AdminPage.jsx` |
| `/profile` | `UserProfilePage.jsx` |
| `/logout` | | 

<br/>

### Hooks
[Hooks](./src/hooks) folder contains the following hooks
| Hook | File     | Usage                |
| :-------- | :------- | :------------------------- |
| `useAuth` | `useAuth.jsx` | Authenticate if user is logged in  |
| `useLocalStorage` | `useLocalStorage.jsx` | Manage Local storage  |
| `useSessionStorage` | `useSessionStorage.jsx` | Manage Session storage  |

<br/>

### Styles
[Styles](./src/styles) folder contains the **CSS** files

<br/>

### Component-Usage-Tree
[Component](./src/components) folder contains the **Components**. Below is the usage tree of each component
```ruby
CreatedPage.jsx
├── LoadingComponent.jsx
├── NavbarComponent2.jsx
└── OutlinedCardComponent.jsx
    ├── StatusBarComponent.jsx
    └── StatusBarComponent.jsx
ApproverPage.jsx
├── LoadingComponent.jsx 
├── NavbarComponent2.jsx
└── OutlinedCardButtonComponent.jsx
    ├── RemarkAddComponent.jsx
    ├── ForwardComponent.jsx
    ├── ActionButtonComponent.jsx
    ├── RevertComponent.jsx
    ├── PrivateRemarkAddComponent.jsx
    ├── CardDetailComponent.jsx
    └── StatusBarComponent.jsx
NotesheetDetailPage.jsx
└── NotesheetDetailComponent.jsx
    ├── RemarkAddComponent.jsx
    ├── RemarkBoxComponent.jsx
    ├── StatusBarDetailedComponent.jsx
    └── RevertComponent.jsx
NotesheetCreatePage.jsx
└── CreateNotesheetComponent.jsx
    └── ChainSelector.jsx
NotesheetEditPage.jsx
└── EditNotesheetComponent.jsx
    └── ChainSelector.jsx
AdminPage.jsx
├── AdminNavbarComponent.jsx
├── AdminEditComponent.jsx 
└── AdminAddComponent.jsx
UserProfilePage.jsx
└── UserProfileComponent.jsx

```

<br/>

### Data-Provider
[Data Provider](./src/data/dataProvider.jsx) provides functions used for fetching and posting data
| Function | Usage |
| :-------- | :------- |
| `Login` | Authenticate user |
| `ChangePassword` | Update user password |
| `AddNewUser` | Create new user account |
| `UserDetails` | Get user profile info |
| `UserNotifications` | Get user notifications |
| `ApprovalNotesheets` | Get notesheets awaiting approval |
| `CreatedNotesheets` | Get notesheets created by user |
| `UserList` | Get list of registered users |
| `ApproverList` | Get list of approver users |
| `CreateNotesheet` | Create a new notesheet |
| `UpdateNotesheet` | Edit an existing notesheet |
| `NotesheetDetails` | View details of a notesheet |
| `SendMessageNotesheet` | Add remarks to a notesheet |
| `ApproveNotesheet` | Approve a notesheet for next step |
| `NewRemark` | Add a new remark to a notesheet |
| `RevertNotesheet` | Revert a notesheet |
| `RejectNotesheet` | Reject a notesheet |

<br/>

### URL
[`Urls.jsx`](./src/data/urls.jsx) provides urls used for fetching and posting data

<br/>



## Color-Reference-for-Notesheet-Status

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Approved | ![#318e46](https://via.placeholder.com/10/318e46?text=+) #318e46 |
| Pending| ![#eed202](https://via.placeholder.com/10/eed202?text=+) #eed202 |
| Reverted | ![#dc903a](https://via.placeholder.com/10/dc903a?text=+) #dc903a |
| Action Required | ![#ea4d4d](https://via.placeholder.com/10/ea4d4d?text=+) #ea4d4d |
| Rejected |![#1c1b1b](https://via.placeholder.com/10/1c1b1b?text=+) #1c1b1b |


## Contributors

- [@shikhar-sm](https://github.com/shikhar-sm)
- [@Hiya-Ghosh](https://github.com/Hiya-Ghosh)
- [@chandranshh](https://github.com/chandranshh)
- [@abrahamvg](https://github.com/abrahamvg)
- [@Aditya-0011](https://github.com/Aditya-0011)
