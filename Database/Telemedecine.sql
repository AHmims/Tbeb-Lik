/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de création :  3/28/2020 10:16:19 PM                    */
/*==============================================================*/


drop table if exists ADMIN;

drop table if exists CONSULTATION;

drop table if exists MEDECIN;

drop table if exists PATIENT;

drop table if exists PHARMACIE;

drop table if exists RENDEZ_VOUS;

drop table if exists SPECIALITES;

/*==============================================================*/
/* Table : ADMIN                                                */
/*==============================================================*/
create table ADMIN
(
   ID_ADMIN             int not null,
   EMAIL                char(250),
   PASSWORD             char(250),
   primary key (ID_ADMIN)
);

/*==============================================================*/
/* Table : CONSULTATION                                         */
/*==============================================================*/
create table CONSULTATION
(
   ID_PAT               char(250) not null,
   MATRICULE            char(250) not null,
   ID_CNSLT             int,
   DESCRIPTION               text,
   CODE_REF             char(250),
   JOUR_REPOS           int,
   ID_RDV               int,
   primary key (ID_PAT, MATRICULE)
);

/*==============================================================*/
/* Table : MEDECIN                                              */
/*==============================================================*/
create table MEDECIN
(
   MATRICULE            char(250) not null,
   ID_SPEC              int not null,
   ID_ADMIN             int not null,
   NOM_MED              char(250),
   TEL                  char(250),
   EMAIL                char(250),
   DISPONIBLE           bool,
   CABINET              char(250),
   IMAGE                longblob,
   VILLE                char(250),
   primary key (MATRICULE)
);

/*==============================================================*/
/* Table : PATIENT                                              */
/*==============================================================*/
create table PATIENT
(
   ID_PAT               char(250) not null,
   NOM_PAT              char(250),
   EMAIL                char(250),
   PASSWORD             char(250),
   TEL                  char(250),
   ADRESS               char(250),
   primary key (ID_PAT)
);

/*==============================================================*/
/* Table : PHARMACIE                                            */
/*==============================================================*/
create table PHARMACIE
(
   ID_PHAR              int not null,
   ID_ADMIN             int not null,
   NOM_PHAR             char(250),
   ADRESS               char(250),
   TEL                  char(250),
   DISPONIBLE           bool,
   primary key (ID_PHAR)
);

/*==============================================================*/
/* Table : RENDEZ_VOUS                                          */
/*==============================================================*/
create table RENDEZ_VOUS
(
   ID_PAT               char(250) not null,
   MATRICULE            char(250) not null,
   ID_RDV               int,
   DATE_RDV_DEBUT       datetime,
   DATE_RDV_FIN         datetime,
   primary key (ID_PAT, MATRICULE)
);

/*==============================================================*/
/* Table : SPECIALITES                                          */
/*==============================================================*/
create table SPECIALITES
(
   ID_SPEC              int not null,
   NOM_SPEC             char(250),
   primary key (ID_SPEC)
);

alter table CONSULTATION add constraint FK_CONSULTATION foreign key (MATRICULE)
      references MEDECIN (MATRICULE) on delete restrict on update restrict;

alter table CONSULTATION add constraint FK_CONSULTATION2 foreign key (ID_PAT)
      references PATIENT (ID_PAT) on delete restrict on update restrict;

alter table MEDECIN add constraint FK_AJOUTER foreign key (ID_ADMIN)
      references ADMIN (ID_ADMIN) on delete restrict on update restrict;

alter table MEDECIN add constraint FK_CONTIENT foreign key (ID_SPEC)
      references SPECIALITES (ID_SPEC) on delete restrict on update restrict;

alter table PHARMACIE add constraint FK_CREATION foreign key (ID_ADMIN)
      references ADMIN (ID_ADMIN) on delete restrict on update restrict;

alter table RENDEZ_VOUS add constraint FK_RENDEZ_VOUS foreign key (MATRICULE)
      references MEDECIN (MATRICULE) on delete restrict on update restrict;

alter table RENDEZ_VOUS add constraint FK_RENDEZ_VOUS2 foreign key (ID_PAT)
      references PATIENT (ID_PAT) on delete restrict on update restrict;

