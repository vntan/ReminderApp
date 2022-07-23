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
	idTask int,
   	idUser int,
   	reminderTime datetime,
    
    CONSTRAINT PK_TaskParticipant PRIMARY KEY (idTask, idUser)
);

create table subTasks(
	idTask int,
    nameSubtask varchar(100),
    status bool
);

create table tag(
	idTask int,
   	nameTag int
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

ALTER TABLE subTasks
ADD CONSTRAINT FK_SubTasks_Task
FOREIGN KEY (idTask) REFERENCES task(idTask)
ON DELETE CASCADE;


ALTER TABLE tag
ADD CONSTRAINT FK_Tag_Task
FOREIGN KEY (idTask) REFERENCES task(idTask)
ON DELETE CASCADE;


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
create procedure addTask
(in userID int(11), in idProjectTask int(11), in idListTask int(11), in nameTask varchar(100), in statusTask varchar(100), in descriptionTask varchar(100),
in dueDateTask datetime)
begin
	declare id int(11)  DEFAULT 0;
    
    if not exists (select * from account where idAccount = userID)
    then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find the user';
    
    end if;
    
    if (idProjectTask IS NULL or exists(select * from projectparticipant where idUser = userID and idProject = idProjectTask)) then
		insert task values (idProjectTask, idListTask, null, nameTask, statusTask, descriptionTask, dueDateTask);
		select max(task.idTask) into id  from task where name = nameTask;
		insert taskparticipant values (id, userID, "editor");
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is not in this project';
    end if;
	
end//

delimiter //
create procedure updateTask
(in idTask int(11), in idProjectTask int(11), in idListTask int(11), in nameTask varchar(100), in statusTask varchar(100), in descriptionTask varchar(100),
in dueDateTask datetime)
begin
	UPDATE task SET idProject = idProjectTask, idList = idListTask, name = nameTask, status = statusTask, description = descriptionTask,
    dueDate = dueDateTask where task.idTask = idTask;
end//


select * from task;

delimiter //
create procedure getTasks
(in userID int(11))
begin
	select task.*, project.idProject, project.name as 'nameProject', listtask.idList, listtask.name as 'nameList',
		(SELECT notification.reminderTime FROM notification WHERE notification.idTask = task.idTask and notification.reminderTime < CURDATE() 
			ORDER BY notification.reminderTime DESC LIMIT 1) AS 'notification', 
		(SELECT COUNT(case when subtasks.status = 1 then 1 else 0 end) + '/'+ COUNT(subtasks.status)  FROM subtasks 
			WHERE subtasks.idTask = task.idTask group by subtasks.idTask) as 'subtasks'
	from task 
	left join project on task.idProject = project.idProject
	left join listtask on task.idList = listtask.idList
    where exists(select * from taskparticipant where idTask = task.idTask and idUser = userID);
    
end//

delimiter //
create procedure addParticipantsToTasks(in idTaskAdd int(11), in emailaccount varchar(100))
BEGIN
	declare idProjectTask int(11)  DEFAULT 0;
    declare idUserInTask int(11)  DEFAULT 0;
    
    select idProject into idProjectTask from task where idTask = idTaskAdd;
    
    if not exists(select * from account where email like emailaccount)
	then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot find account from this email';
	end if;
    
	select idAccount into idUserInTask from account where email like emailaccount;
    
    if (exists(select * from taskparticipant where idUser = idUserInTask and idTask = idtask))
	then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This email is the member of this task';
	end if;
    
	IF idProjectTask is not null and not exists(select * from projectparticipant where idUser = idUserInTask and idProject = idProjectTask) 
    then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This account is not in this project';
	end if;
   
	insert into taskparticipant values (idTaskAdd, idUserInTask);
    
END//


