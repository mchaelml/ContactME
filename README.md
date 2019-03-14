Created using create-react-app

Added responsiveness, filtering, create user, delete user and pagination (set to 5 contacts per page)

To save the drag and drop contacts order need to use custom fields -> create custom-field for each contact with his id number in the list and update it whether the ordering has changed. Then render the contacts based on the order id.

The only issue is by the way the sort works now is that if a person did not have an orderId (was null) and then received it ,makes it jump as the sort first shows ones with order id and then the ones which are null;
