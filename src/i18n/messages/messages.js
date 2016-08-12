

const translations = {
    formNameInputPlaceholder: {
        id              : "AddBoard.formNameInputPlaceholder",
        defaultMessage  : "Name of the board",
        description     : "Form Input for Board Name",
    },
    formDescriptionInputPlaceholder : {
        id              : "AddBoard.formDescriptionInputPlaceholder",
        defaultMessage  : "description of this board",
        description     : "Form Input for Board description",
    },
    HeaderAppTitle : {
        id              : "HeaderApp.Title",
        defaultMessage  : "WhiteBoard Website",
        description     : "Title of the app",
    },
    FormSubmitButton : {
        id              : "AddBoard.FormSubmitButton",
        defaultMessage  : "Send",
        description     : "Button to send a new board",
    },
    searchBarPlaceholder : {
        id              : "SearchBoard.placeholder",
        defaultMessage  : "Search...",
        description     : "placeholder of the search bar",
    },
    HeaderAppLabelButton : {
        id              : "HeaderApp.labelButton",
        defaultMessage  : "Create board",
        description     : "placeholder of the search bar",
    },
    MenuItemEnglish     : {
        id              : "HeaderApp.MenuItemEnglish",
        defaultMessage  : "EN",
        description     : "Menu item choice english language",
    },
    MenuItemFrench     : {
        id              : "HeaderApp.MenuItemFrench",
        defaultMessage  : "FR",
        description     : "Menu item choice french language",
    },
    MemberLogin     : {
        id              : "Login.MemberLogin",
        defaultMessage  : "Login",
        description     : "Member login title",
    },
    ButtonLogin     : {
        id              : "Login.ButtonLogin",
        defaultMessage  : "Login with Google",
        description     : "Text on google login button",
    },
    LoginFailed     : {
        id              : "LoginFailed",
        defaultMessage  : "Login Failed !"
    },
    LoginFailedMessage     : {
        id              : "LoginFailedMessage",
        defaultMessage  : "Try again in a few seconds"
    },
    SuccessfullyLoggedIn : {
        id              : "SuccessfullyLoggedIn",
        defaultMessage  : "successfully logged in",
    },
    Welcome             : {
        id              : "Welcome",
        defaultMessage  : "Welcome",
    },
    AuthenticationDenied : {
        id              : "AuthenticationDenied",
        defaultMessage  : "Authentication denied"
    },
    AuthenticationDeniedMessage : {
        id              : "AuthenticationDeniedMessage",
        defaultMessage  : "Please login with your sfeir.lu adress"
    },
    Cancel              : {
        id              : "Cancel",
        defaultMessage  : "Cancel"
    },
    Submit              : {
        id              : "Submit",
        defaultMessage  : "Submit"
    },
    ConfirmDelete       : {
        id              : "ConfirmDelete",
        defaultMessage  : "Permanently delete this board"
    },
    ConfirmDeleteMessage: {
        id              : "ConfirmDeleteMessage",
        defaultMessage  : "This action cannot be undone. You will lost the board and all his widgets"
    },
    Create              : {
        id              : "Create",
        defaultMessage  : "Create"
    },
    AddNewBoard         : {
        id              : "AddNewBoard",
        defaultMessage  : "Create new board"
    },
    Error               : {
        id              : "Error",
        defaultMessage  : "Error",
    },
    ErrorMessage        : {
        id              : "ErrorMessage",
        defaultMessage  : "oops something wrong happened",
    },
    Success        : {
        id              : "Success",
        defaultMessage  : "Success ! ",
    },
    SuccessBoardAdded   : {
        id              : "SuccessBoardAdded",
        defaultMessage  : "Board created !",
    },
    SuccessBoardDeleted : {
        id              : "SuccessBoardDeleted",
        defaultMessage  : "Board deleted !",
    },
    BoardNotFound : {
        id              : "BoardNotFound",
        defaultMessage  : "Board not found",
    },
    BoardNotFoundMessage : {
        id              : "BoardNotFoundMessage",
        defaultMessage  : "It seems this board doesn't exist",
    },
    boardForm : {
        name : {
            label : {
                id              : "name",
                defaultMessage  : "Name"
            },
            errors : {
                required  : {
                    id              : "namerequired",
                    defaultMessage  : "Name property is required."
                },
                minLength : {
                    id              : "nameminlength",
                    defaultMessage  : "Name should have at least {minLength} characters."
                }
            }
        },
        description : {
            label : {
                id              : "description",
                defaultMessage  : "Description"
            },
            errors : {
                required  : {
                    id              : "descriptionrequired",
                    defaultMessage  : "Description property is required."
                },
                minLength : {
                    id              : "descriptionminlength",
                    defaultMessage  : "Description should have at least {minLength} characters."
                }
            }
        },
        type : {
            label : {
                id : "type",
                defaultMessage : "type"
            },
            errors : {
                required : {
                    id : 'typerequired',
                    defaultMessage : 'Board type is required'
                }
            }
        }
    },
    aboutUsFollowUs : {
        id             : 'aboutUsFollowUs',
        defaultMessage : "Follow us here !"
    },
    error404sorry : {
        id             : 'error404sorry',
        defaultMessage : "We're sorry, but the page you're looking for can't be found"
    },
    error404look : {
        id             : 'error404look',
        defaultMessage : "You might try searching our site, or starting at our home page"
    },
    noBoardFound : {
        id             : 'noBoardFound',
        defaultMessage : "No board found "
    }
};



export default translations;
