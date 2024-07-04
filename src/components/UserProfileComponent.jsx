import defaultProfileImage from "../images/user.png";
import BGMainImage from "../images/BG_main.png";

const UserProfileComponent = ({ userData, logout }) => {
    return (
    
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BGMainImage})` }}>
        <div className="min-h-screen bg-orange-500 bg-opacity-60 flex items-center justify-center">
            <div className="max-w-md p-5 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="mb-5">
                        <img src={defaultProfileImage} alt="Profile" className="rounded-full w-32 h-32" />
                    </div>
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">{userData.name}</h2>
                        <h3 className="text-lg text-gray-600">{userData.email}</h3>
                        <span className="text-gray-500">{userData.position}</span>
                    </div>

                    <div className="w-full mb-6">
                         <div className="mb-4">
                             <span className="font-bold">Faculty: </span>
                             <span className="text-gray-600">{userData.faculty}</span>
                         </div>
                         <div className="mb-4">
                             <span className="font-bold">School: </span>
                             <span className="text-gray-600">{userData.school}</span>
                         </div>
                    <div className="mb-4">
                             <span className="font-bold">Department: </span>
                             <span className="text-gray-600">{userData.department}</span>
                         </div>
                    <div className="mb-4">
                             <span className="font-bold">Phone: </span>
                             <span className="text-gray-600">{userData.phone}</span>
                     </div>
                </div>

                
        

                <div className="flex space-x-4">
                    <a href="/home" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Back
                    </a>
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>  
    
    );
};

export default UserProfileComponent;