create database reminder;

use reminder;

create table project(
	idProject int not null AUTO_INCREMENT,
    name varchar(100),
    description varchar(100),
    CONSTRAINT PK_PROJECT PRIMARY KEY (idProject)
);

create table projectParticipant(
	idProject int,
   	idUser int,
    role varchar(100),
    CONSTRAINT PK_ProjectParticipant PRIMARY KEY (idProject, idUser)
);

create table account(
	idAccount int not null AUTO_INCREMENT,
    name varchar(100),
    email varchar(100),
	password varchar(500),
    urlImage varchar(500),
    CONSTRAINT PK_ACCOUNT PRIMARY KEY(idAccount)
);

create table listTask(
    idProject int,
    idUser int,
	idList int not null AUTO_INCREMENT,
    name varchar(100),
    CONSTRAINT PK_LIST PRIMARY KEY(idList)
);



create table task(
    idProject int,
    idList int,
	idTask int not null AUTO_INCREMENT,
  	name varchar(100),
	status VARCHAR(100),
    description varchar(100),
    dueDate datetime,
    CONSTRAINT PK_TASK PRIMARY KEY(idTask)
);

create table taskParticipant(
	idTask int,
   	idUser int,
    CONSTRAINT PK_TaskParticipant PRIMARY KEY (idTask, idUser)
);

create table notification(
	idNotification int not null AUTO_INCREMENT PRIMARY KEY,
    idTask int,
   	idUser int,
   	reminderTime datetime
);

create table subTask(
	idSubTask int not null AUTO_INCREMENT PRIMARY KEY,
	idTask int,
    name varchar(100),
    status bool
);

create table tag(
	idTag int not null AUTO_INCREMENT PRIMARY KEY,
	idTask int,
   	nameTag varchar(100)
);

ALTER TABLE projectParticipant
ADD CONSTRAINT FK_ProjectParticipant_Project
FOREIGN KEY (idProject) REFERENCES project(idProject)
ON DELETE CASCADE;


ALTER TABLE projectParticipant
ADD CONSTRAINT FK_ProjectParticipant_Account
FOREIGN KEY (idUser) REFERENCES account(idAccount)
ON DELETE CASCADE;

ALTER TABLE listTask
ADD CONSTRAINT FK_ListTask_Project
FOREIGN KEY (idProject) REFERENCES project(idProject)
ON DELETE CASCADE;

ALTER TABLE listTask
ADD CONSTRAINT FK_ListTask_Account
FOREIGN KEY (idUser) REFERENCES account(idAccount)
ON DELETE CASCADE;

ALTER TABLE task
ADD CONSTRAINT FK_Task_Project
FOREIGN KEY (idProject) REFERENCES project(idProject)
ON DELETE CASCADE;

ALTER TABLE task
ADD CONSTRAINT FK_Task_ListTask
FOREIGN KEY (idList) REFERENCES listTask(idList)
ON DELETE CASCADE;

ALTER TABLE taskParticipant
ADD CONSTRAINT FK_TaskParticipant_Task
FOREIGN KEY (idTask) REFERENCES task(idTask)
ON DELETE CASCADE;

ALTER TABLE taskParticipant
ADD CONSTRAINT FK_TaskParticipant_Account
FOREIGN KEY (idUser) REFERENCES account(idAccount)
ON DELETE CASCADE;

ALTER TABLE notification
ADD CONSTRAINT FK_Notification_Task
FOREIGN KEY (idTask) REFERENCES task(idTask)
ON DELETE CASCADE;

ALTER TABLE notification
ADD CONSTRAINT FK_Notification_Account
FOREIGN KEY (idUser) REFERENCES account(idAccount)
ON DELETE CASCADE;

ALTER TABLE subTask
ADD CONSTRAINT FK_SubTask_Task
FOREIGN KEY (idTask) REFERENCES task(idTask)
ON DELETE CASCADE;


ALTER TABLE tag
ADD CONSTRAINT FK_Tag_Task
FOREIGN KEY (idTask) REFERENCES task(idTask)
ON DELETE CASCADE;

/*
----------------------------- Account -------------------------------------------
*/

delimiter //
create procedure getAccount(in userID int)
begin
	select `idAccount`,`name`,`email`, `urlImage` from account where account.idAccount = userID;
end//


delimiter //
create procedure login(in emailAccount varchar(100), in passwordAccount nvarchar(100))
begin
	if not exists(select * from account where email like emailAccount and password = passwordAccount) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Login Failed';
	else
		select `idAccount`,`name`,`email`, `urlImage` from account where email like emailAccount and password = passwordAccount;
    end if;
end//

delimiter //
create procedure register(in nameAccount varchar(100), in emailAccount varchar(100), in passwordAccount varchar(500), in urlImageAccount varchar(500))
begin
	
	if exists(select * from account where email = emailAccount) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email is existed';
    else
	 insert into account set name = nameAccount, email = emailAccount, password = passwordAccount, urlImage = urlImageAccount;
     select * from account where email = emailAccount;
    END IF;
    
end//

delimiter //
create procedure loginWithGoogle(in nameAccount varchar(100), in emailAccount varchar(100), in passwordAccount varchar(500), in urlImageAccount varchar(500))
begin
	if not exists(select * from account where email like emailAccount and password = passwordAccount) then
		CALL register(nameAccount, emailAccount, passwordAccount, urlImageAccount);
	end if;
	
    select `idAccount`,`name`,`email`, `urlImage` from account where email like emailAccount and password = passwordAccount;
    
end//

delimiter //
create procedure updateAccountInformation(in accountID int, in nameUser varchar(100), in passwordUser varchar(500), in urlImageUser varchar(500))
begin
	if exists (select * from account where idAccount = accountID) then
		if (nameUser != "") then update account set name = nameUser where idAccount = accountID; end if;
        if (passwordUser != "") then update account set password = passwordUser where idAccount = accountID; end if;
		if (urlImageUser != "") then update account set urlImage = urlImageUser where idAccount = accountID; end if; 
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the account to update';
	end if;
		
end//

delimiter //
create procedure updateAccountPassword(in emailAccount varchar(100), in passwordUser varchar(500))
begin
	if exists (select * from account where email = emailAccount) then
		update account set password = passwordUser
        where email = emailAccount;
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the account to update';
	end if;
		
end//

delimiter //
create procedure deleteUser(in accountID int)
begin
	delete from account where idAccount = accountID;
end//

delimiter //
create procedure findUser(in emailUser varchar(100))
begin
	select idAccount from account where email like emailUser;
end//

/*
----------------------------- Project -------------------------------------------
*/

delimiter //
create procedure showAllProject(in userID int)
begin
	select * from project 
    where idProject in (
		select idProject from projectparticipant where idUser = userID
    );
end//

delimiter //
create procedure getParticipants(in projectID int)
begin
	    select p.*, a.name, a.email, a.urlImage from projectparticipant as p
		left join account as a on a.idAccount = p.idUser
		where idProject = projectID;
end//



delimiter //
create procedure getProjectInformation(in userID int, in projectID int)
begin
    if (not exists(select * from projectparticipant where IDproject = projectID and  idUser = userID)) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This account is denied!';
	end if;
    
	select * from project where idProject = projectID;
    
    select p.*, a.name, a.email, a.urlImage from projectparticipant as p
		left join account as a on a.idAccount = p.idUser
		where idProject = projectID;
        
	select l.*, 
			getCountTasksStatusInfomation(projectID, l.idList, null) as 'Tasks',
            getCountTasksStatusInfomation(projectID, l.idList, "Complete") as 'TasksSuccess'
    
    from listtask as l where idProject = projectID;
end//



delimiter //
create function getCountTasksStatusInfomation(projectID int, listID int, statusTask varchar(100))
returns int
begin
	declare countTasks int default 0;
	if ISNULL(statusTask) then
		select count(*) into countTasks from task as t
			left join listTask as l using (idList)
			left join project as p on t.idProject = p.idProject
		where t.idList = listID and t.idProject = projectID
		group by t.idList, t.idProject;
		return countTasks;
    else
		select count(*) into countTasks from task as t
		left join listTask as l using (idList)
        left join project as p on t.idProject = p.idProject
		where t.idList = listID and t.idProject = projectID and t.status like statusTask
		group by t.idList, t.idProject;
		return countTasks;
    end if;
end//

delimiter //
create procedure addProject(in userID int, in nameProject varchar(100), in description varchar(100))
begin
	declare projectID int;
    
	if (not exists(select * from account where idAccount = userID)) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the user';
	end if;
    
	insert project(name, description) values (nameProject, description);
    
    select max(idProject) into projectID from project where name = nameProject;

	-- set  projectIDR = projectID;
	
    insert projectparticipant values (projectID, userID, "Admin");
    
    call showAllProject(userID);
end//

delimiter //
create procedure addParticipantToProject(in projectID int, in userIDAdmin int, in userIDAdd int, roleUser varchar(100))
begin

	if (not exists(select * from projectparticipant where IDproject = projectID and  idUser = userIDAdmin and role like 'admin')) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the project or this account have not permission!';
	end if;
    
	if (not exists(select * from account where idAccount = userIDAdd)) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the user';
	end if;
    
	if (exists(select * from projectparticipant where IDproject = projectID and  idUser = userIDAdd)) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This account already in the project';
	end if;
    
    insert projectparticipant values (projectID, userIDAdd, roleUser);

	call getParticipants(projectID);
    
end//

delimiter //
create procedure deleteParticipantToProject(in projectID int, in userIDDelete int, roleUser varchar(100))
begin
	delete from projectparticipant where idProject = projectID and idUser = userIDDelete and role like roleUser;
end//

delimiter //
create procedure updateParticipantToProject(in projectID int, in userIDUpdate int, roleUser varchar(100))
begin
	update projectparticipant set role = roleUser where idProject = projectID and idUser = userIDUpdate;
end//

delimiter //
create procedure deleteProject(in userID int, in projectID int)
begin
	if (not exists(select * from projectparticipant where IDproject = projectID and  idUser = userID and role like 'admin')) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the project or this account have not permission!';
	end if;
	delete from project where idProject = projectID;
end//

delimiter //
create procedure editProject(in userID int, in projectID int, nameProject varchar(100), descriptionProject varchar(100))
begin
	if (not exists(select * from projectparticipant where IDproject = projectID and  idUser = userID and role like 'admin')) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the project or this account have not permission!';
	end if;
	update project set name = nameProject, description = descriptionProject
    where idProject = projectID;
end//



/*
----------------------------- List -------------------------------------------
*/

delimiter //
create procedure showList(in userID int)
begin
	select * from listtask where idUser = userID or
				idProject in (select idProject from projectparticipant where idUser = userID);

end//


delimiter //
create procedure addList(in projectID int, in userID int, in nameList varchar(100))
begin
	if ISNULL(projectID) and ISNULL(userID) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'List must belong to project or created by user';
    END IF;
    
    if ISNULL(userID) then
		if (not exists(select * from project where idProject = projectID)) then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the project';
        end if;
		insert listtask(idProject, name) values (projectID, nameList);
		select l.*, 
			getCountTasksStatusInfomation(projectID, l.idList, null) as 'Tasks',
            getCountTasksStatusInfomation(projectID, l.idList, "Complete") as 'TasksSuccess'
    
    	from listtask as l where idProject = projectID;
	else
		if (not exists(select * from account where idAccount = userID)) then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the user';
        end if;
		insert listtask(idUser, name) values (userID, nameList);
		call showList(userID);
    end if;
end//

delimiter //
create procedure addListByTask(in projectID int, in userID int, in nameList varchar(100))
begin
	if ISNULL(projectID) and ISNULL(userID) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'List must belong to project or created by user';
    END IF;
    
    if ISNULL(projectID) then
		if (not exists(select * from account where idAccount = userID)) then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the user';
        end if;
		insert listtask(idUser, name) values (userID, nameList);
	else
		if (not exists(select * from project where idProject = projectID)) then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the project';
        end if;
		insert listtask(idProject, name) values (projectID, nameList);
    end if;

	call showList(userID);
end//

delimiter //
create procedure deleteList(in listID int)
begin
	delete from listtask where idList = listID;
end//

delimiter //
create procedure editList(in listID int, in nameList varchar(100))
begin
	update listtask set name = nameList where idList = listID;
end//

/*
----------------------------- Tasks -------------------------------------------
*/

delimiter //
create function getCountSubTasksStatus(taskID int, statusTask varchar(100))
returns int
begin
	declare countTasks int default 0;
	if ISNULL(statusTask) then
		select count(*) into countTasks from subtask where idTask = taskID;
    else
		select count(*) into countTasks from subtask where idTask = taskID and status = statusTask;
    end if;
    return countTasks;
end//

delimiter //
create function getNearestNotification(taskID int, idUser int)
returns datetime
begin
	declare dateNotification datetime default null;
    select min(reminderTime) into dateNotification from notification where reminderTime > date(now());
    return dateNotification;
end//

delimiter //
create procedure showUserTasks(in userID int)
begin
	select task.*, project.*, listtask.*,
			getNearestNotification(task.idTask, userID) as 'notification',
			getCountSubTasksStatus(task.idTask, null) as 'countTasks',
            getCountSubTasksStatus(task.idTask, 'Complete') as 'countCompleteTasks'  
	from task 
    left join project on project.idProject = task.idProject
    left join listtask on listtask.idList = task.idList
    where task.idProject in (select idProject from projectparticipant where idUser = userID)
	  or task.idList in (select idList from listtask where idUser = userID);
      
      
	select t.*, a.idAccount, a.name, a.email, a.urlImage from taskparticipant as t
    left join account as a on a.idAccount = t.idUser
    where idTask in
		(
			select task.idTask from task  
			where task.idProject in (select idProject from projectparticipant where idUser = userID)
			or task.idList in (select idList from listtask where idUser = userID)
		);
        
	select * from notification where idTask in
		(
			select task.idTask from task  
			where task.idProject in (select idProject from projectparticipant where idUser = userID)
			or task.idList in (select idList from listtask where idUser = userID)
		);
        
	select * from subtask where idTask in
		(
			select task.idTask from task  
			where task.idProject in (select idProject from projectparticipant where idUser = userID)
			or task.idList in (select idList from listtask where idUser = userID)
		);
        
	select * from tag where idTask in
		(
			select task.idTask from task  
			where task.idProject in (select idProject from projectparticipant where idUser = userID)
			or task.idList in (select idList from listtask where idUser = userID)
		);        
end//

delimiter //
create procedure addTask
(in userID int, in projectID int, in listID int, nameTask varchar(100), statusTask varchar(100), descriptionTask varchar(100), dueDateTask datetime)
begin
	declare taskID int;
    
	if (not exists(select * from account where idAccount = userID)) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the user';
	end if;
    
    if (projectID = -1) then
		if (not exists (select * from listtask where idList = idList and idUser = userID)) then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This account have not permission';
		end if;
        set projectID =  null;
    else
		if (not exists (select * from projectparticipant where idProject = projectID and idUser = userID)) then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This account have not permission';
		end if;
	end if;
    
	insert task(idProject, idList, name, status, description, dueDate)
	values (projectID, listID, nameTask, statusTask, descriptionTask, dueDateTask);
    
    select max(idTask) into taskID from task where name = nameTask and dueDate = dueDateTask;
    call addTaskParticipant(taskID, userID);
	select max(idTask) as 'idTask' from task where name = nameTask and dueDate = dueDateTask;
end//

delimiter //
create procedure addNotification(in taskID int, in userID int, in reminder datetime)
begin
	if (exists(select * from notification where idTask = taskID and idUser = userID and reminderTime = reminder)) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Notification existed';
	end if;
	insert notification(`idTask`, `idUser`, `reminderTime`) values (taskID, userID, reminder);
	select * from notification where idTask = taskID and idUser = userID;
end//

delimiter //
create procedure addTag(in taskID int, in nameTag varchar(100))
begin
	insert tag(idTask, nameTag) values (taskID, nameTag);
	select * from tag where idTask = taskID;
end//

delimiter //
create procedure addTaskParticipant(in taskID int, in userID int)
begin
	insert taskparticipant values (taskID, userID);
end//

delimiter //
create procedure addSubtask(in taskID int, nameSubTask varchar(100), statusSubtask bool)
begin
	insert subtask(`idTask`, `name`, `status`) values (taskID, nameSubTask, statusSubtask);
	select * from subtask where idTask = taskID;
end//



delimiter //
create procedure deleteTask(in taskID int)
begin
	delete from task where idTask = taskID;
end//

delimiter //
create procedure deleteNotification(in taskID int, in userID int, in reminder datetime)
begin
	delete from notification where idTask = taskID and idUser = userID and reminderTime = reminder;
end//

delimiter //
create procedure deleteTag(in tagID int)
begin
	delete from tag where idTag = tagID;
end//

delimiter //
create procedure deleteTaskParticipant(in taskID int, in userID int)
begin
	delete from taskparticipant where idTask = taskID and idUser = userID;
end//

delimiter //
create procedure deleteSubtasks(in subTaskID int)
begin
	delete from subtasks where idSubTask = subTaskID;
end//


delimiter //
create procedure updateTask
(in taskID int, in projectID int, in listID int, nameTask varchar(100), statusTask varchar(100), descriptionTask varchar(100), dueDateTask datetime)
begin
	update task set idProject = projectID, idList = listID, name = nameTask, status = statusTask, description = descriptionTask, dueDate=dueDateTask
    where idTask = taskID;
end//

-- delimiter ;
-- call loginWithGoogle('admin1', 'admin1@gmail.com', '202cb962ac59075b964b07152d234b70', 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg');
-- call loginWithGoogle('admin2', 'admin2@gmail.com', '202cb962ac59075b964b07152d234b70', 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');

-- call addProject(1, 'Project 1', 'This is project 1', @projectID);
-- call addProject(1, 'Project 2', 'This is project 2', @projectID);

-- call addProject(2, 'Project 1', 'This is project 1', @projectID);
-- call addProject(2, 'Project 2', 'This is project 2', @projectID);

-- call addList(2, null, 'Project 2 - List 1');
-- call addList(2, null, 'Project 2 - List 2');

-- call addList(1, null, 'Project 1 - List 1');
-- call addList(1, null, 'Project 1 - List 2');



-- select * from project;
-- select * from listtask;
-- select * from task;






