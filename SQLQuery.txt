USE percyAvalos;

CREATE TABLE PERSONAL (
IdPersonal int IDENTITY(1,1) NOT NULL,
ApPaterno varchar(255) NOT NULL,
ApMaterno varchar(255) NOT NULL,
Nombre1 varchar(255) NOT NULL,
Nombre2 varchar(255) NOT NULL,
NombreCompleto varchar(255),
FchNac date NOT NULL,
FchIngreso date NOT NULL,
CONSTRAINT PK_personal PRIMARY KEY (IdPersonal)
);

CREATE TABLE HIJO(
IdDerhab int IDENTITY(1,1) NOT NULL,
IdPersonal int NOT NULL,
ApPaterno varchar(255) NOT NULL,
ApMaterno varchar(255) NOT NULL,
Nombre1 varchar(255) NOT NULL,
Nombre2 varchar(255) NOT NULL,
NombreCompleto varchar(255) NOT NULL,
FchNac date NOT NULL,
CONSTRAINT PK_hijo PRIMARY KEY (IdDerhab),
FOREIGN KEY (IdPersonal) REFERENCES PERSONAL(IdPersonal)
)


/** PERSONAL */
GO
Create procedure spAddPersonal         
(               
    @ApPaterno varchar(255),        
    @ApMaterno varchar(255),        
    @Nombre1 varchar(255),       
    @Nombre2 varchar(255),
	@FchNac date,
	@FchIngreso date
)        
as         
Begin        
	DECLARE @NombreCompleto varchar(255)=NULL
	SET @NombreCompleto = CONCAT(@Nombre1,' ',@Nombre2,' ',@ApPaterno,' ',@ApMaterno)
    Insert into PERSONAL (ApPaterno,ApMaterno, Nombre1,Nombre2,NombreCompleto,FchNac,FchIngreso)         
    Values (@ApPaterno,@ApMaterno, @Nombre1,@Nombre2, @NombreCompleto,@FchNac,@FchIngreso)         
End 

GO
Create procedure spUpdatePersonal      
(         
    @IdPersonal int,      
    @ApPaterno varchar(255),        
    @ApMaterno varchar(255),        
    @Nombre1 varchar(255),       
    @Nombre2 varchar(255),
	@FchNac date,
	@FchIngreso date   
)        
as        
begin        
   Update PERSONAL         
   set ApPaterno=@ApPaterno,        
   ApMaterno=@ApMaterno,        
   Nombre1=@Nombre1,      
   Nombre2=@Nombre2,
   NombreCompleto = CONCAT(@Nombre1,' ',@Nombre2,' ',@ApPaterno,' ',@ApMaterno),      
   FchNac=@FchNac,      
   FchIngreso=@FchIngreso        
   where IdPersonal=@IdPersonal        
End  

GO
Create procedure spDeletePersonal       
(        
    @IdPersonal int    
)        
as         
begin        
   Delete from PERSONAL where IdPersonal=@IdPersonal        
End 

GO
Create procedure spGetAllPersonal   
as      
Begin      
    select *      
    from PERSONAL   
    order by IdPersonal      
End  

GO
Create procedure spGetPersonalByFilter     
(        
    @Nombre1 NVARCHAR(50) = NULL,   
    @Nombre2 NVARCHAR(50) = NULL,   
    @ApPaterno NVARCHAR(50) = NULL,
    @ApMaterno NVARCHAR(50) = NULL
)        
as         
begin  
   SET NOCOUNT ON
   
   DECLARE @SQL VARCHAR(MAX)
   DECLARE @Nombre1Filter VARCHAR(MAX) 
   DECLARE @Nombre2Filter VARCHAR(MAX) 
   DECLARE @ApPaternoFilter VARCHAR(MAX)
   DECLARE @ApMaternoFilter VARCHAR(MAX)
   DECLARE @all VARCHAR(2)   = '-1'
	
    SET @Nombre1Filter= CASE WHEN @Nombre1 IS NULL OR @Nombre1 = ''
	THEN '''' + @all + ''' = ''' + @all + '''' 
	ELSE 'Nombre1 like ''%' + @Nombre1 + '%''' 
	END

	SET @Nombre2Filter= CASE WHEN @Nombre2 IS NULL OR @Nombre2 = ''
	THEN '''' + @all + ''' = ''' + @all + '''' 
	ELSE 'Nombre2 like ''%' + @Nombre2 + '%''' 
	END

	SET @ApPaternoFilter= CASE WHEN @ApPaterno IS NULL OR @ApPaterno = ''
	THEN '''' + @all + ''' = ''' + @all + '''' 
	ELSE 'ApPaterno like ''%' + @ApPaterno + '%''' 
	END

	SET @ApMaternoFilter= CASE WHEN @ApMaterno IS NULL OR @ApMaterno = ''
	THEN '''' + @all + ''' = ''' + @all + '''' 
	ELSE 'ApMaterno like ''%' + @ApMaterno + '%''' 
	END
   
   SET @SQL = 'SELECT IdPersonal
					  ,ApPaterno
					  ,ApMaterno
					  ,Nombre1
					  ,Nombre2
					  ,NombreCompleto
					  ,FchNac
					  ,FchIngreso
					FROM Personal
					WHERE ' + @Nombre1Filter
					+ ' AND ' + @Nombre2Filter + ''
					+ ' AND ' + @ApPaternoFilter + ''
					+ ' AND ' + @ApMaternoFilter + ''
			
 
			PRINT (@sql)
			EXEC(@sql)
			
End 

/** HIJO */

GO
Create procedure spAddHijo       
(        
	@IdPersonal int,        
    @ApPaterno varchar(255),        
    @ApMaterno varchar(255),        
    @Nombre1 varchar(255),       
    @Nombre2 varchar(255),
	@FchNac date
)        
as         
Begin        
	DECLARE @NombreCompleto varchar(255)=NULL
	SET @NombreCompleto = CONCAT(@Nombre1,' ',@Nombre2,' ',@ApPaterno,' ',@ApMaterno)
    Insert into HIJO (IdPersonal,ApPaterno,ApMaterno, Nombre1,Nombre2,NombreCompleto,FchNac)         
    Values (@IdPersonal,@ApPaterno,@ApMaterno, @Nombre1,@Nombre2,@NombreCompleto,@FchNac)         
End 

GO
Create procedure spUpdateHijo   
(        
	@IdDerhab int,
	@IdPersonal int,        
    @ApPaterno varchar(255),        
    @ApMaterno varchar(255),        
    @Nombre1 varchar(255),       
    @Nombre2 varchar(255),
	@FchNac date  
)        
as        
begin        
   Update HIJO         
   set IdPersonal=@IdPersonal,
   ApPaterno=@ApPaterno,        
   ApMaterno=@ApMaterno,        
   Nombre1=@Nombre1,      
   Nombre2=@Nombre2,   
   NombreCompleto = CONCAT(@Nombre1,' ',@Nombre2,' ',@ApPaterno,' ',@ApMaterno),   
   FchNac=@FchNac      
   where IdDerhab=@IdDerhab        
End  

GO
CREATE PROCEDURE spDeleteHijo     
(        
    @IdDerhab varchar    
)        
as         
begin        
   Delete from HIJO where IdDerhab=@IdDerhab        
End 

GO
CREATE PROCEDURE spGetAllHijo
as      
Begin      
    select *      
    from HIJO   
    order by IdDerhab      
End  

GO 
CREATE PROCEDURE spGetHijoByPersonal(
	@IdPersonal int
)
AS
BEGIN
    select *      
    from HIJO 
	WHERE IdPersonal=@IdPersonal
    order by IdDerhab    
END
