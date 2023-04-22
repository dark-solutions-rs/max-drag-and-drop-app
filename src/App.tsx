/*
  Napraviti mini-library za drag & drop (D&D) koji u pozadini koristi context API.
  Implementacija treba da koristi HTML5 D&D API i da se ne oslanja na postojece D&D npm pakete.
  Sva logika (onDragStart, onDragEnd, onDragOver, itd.) treba da se nalazi u DragContext, DragArea i DragItem
  komponentama tako da nije izlozena korisniku library-a.
	
  U ovom slucaju event handler onDragStart trebao bi da bude na DragItem komponenti, dok bi
  onDrop i onDragOver trebali da budu na DragArea componenti. Te dvije komponente izmedju sebe
  trebaju da komuniciraju putem context API.
	
  Metode za komunikaciju mogu da se nalaze u DragContext ili DragArea komponenti.

  Pozeljno je napraviti stil za UserItem komponentu radi boljeg prikaza konacne aplikacije.
	
  Ispod je primjer komponente koja bi korista library na zeljeni nacin. Ukoliko ovakva struktura
  bude u browseru rezultovala renderovanju liste korisnika koja se moze sortirati, zadatak se smatra
  uspjesno zavrsenim.

  Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.
	
  Koristiti React i TypeScript.

  Puno srece ;-)
*/
import { FC, useCallback, useState } from "react";
import { DragContext, DragArea, DragItem } from "./component/DragAndDrop";
import { UserItemProps, UserType } from "./types";
import users from "./data/users.json";

const UserItem: FC<UserItemProps> = ({ name, email }) => {
  return (
    <>
      <p><span>{name}</span></p>
      <p><span>{email}</span></p>
    </>
  );
};

const DraggableUserList: FC = () => {
  const [userList, setUserList] = useState<UserType[]>(users);

  const onSortList = useCallback((newUserList: any[]) => {
    setUserList(newUserList);
  }, [setUserList]);

  return (
    <DragContext note="Ovo je opcionalan wrapper">
      <DragArea as={'ul'} items={userList} onSortList={onSortList}>
        {userList.map((user, i) => (
          <DragItem key={user.id} as={'li'} index={i} note="ovde moze da ide key, index, itd.">
            <UserItem name={`${user.firstName} ${user.lastName}`} email={user.email} />
          </DragItem>
        ))}
      </DragArea>
    </DragContext>
  );
};

export default DraggableUserList;
