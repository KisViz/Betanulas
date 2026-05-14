import "./Pet.css"
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Pet() {

    const [pets, setPets] = useState([
        // { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
        // { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
        // { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
        // { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
        // { name: "Paws", species: "dog", age: "6", id: 789789789 }
    ])

    // csak akkor fusson, amikor eloszor betoltodik
    useEffect(() => {
        if (localStorage.getItem("examplePetData")) {
            setPets(JSON.parse(localStorage.getItem("examplePetData")))
        }
    }, [])
    
    // minden alkalommal fut,amikor az allat allapota valtozik
    useEffect(() => {
        localStorage.setItem("examplePetData", JSON.stringify(pets))
    }, [pets])

    return(
        <>
        <Header />
        <LikeArea />
        <Foods />
        <TimeArea />
        <AddPetForm setPets={setPets} />

        <ul>
            {pets.map(function(pet) {
                return <IndividualPets setPets={setPets} id={pet.id} name={pet.name} species={pet.species} age={pet.age} key={pet.id}/>
            })}
        </ul>
        <ul>
            {pets.map( pet => <IndividualPets setPets={setPets} id={pet.id} name={pet.name} species={pet.species} age={pet.age} key={pet.id}/> )}
        </ul>

        <Footer />
        </>
    );
}

function LikeArea() {
    const [likeCount, setLikeCount] = useState (0)

    function increaseLikeHandler() {
        setLikeCount(function(prev) {
            return prev + 1
        });
    }

        function decreaseLikeHandler() {
        setLikeCount(prev => {
            if (prev > 0) {
                return prev - 1
            } else {
                return 0
            }
        });
    }

    return (
        <>
            <button onClick={increaseLikeHandler}>Increase likes</button>
            <button onClick={decreaseLikeHandler}>Decreade likes</button>
            <h2>This page has been liked {likeCount} times</h2>
        </>
    )
}

function Foods() {
    const food1 = "Orange";
    const food2 = "Banana"; 

    return (
        <ul>
            <li>Apple</li>
            <li>{food1}</li> 
            <li>{food2.toUpperCase()}</li>
        </ul>
    );
}

function TimeArea() {
    //3 a react megint futtatja a TimeArea functiont, de tudja, hogy ez nem az első alkalom, 
    // ezért csak a setTimeoutot futtatja -> másodpercenként frissü az idő

    //1 amikor betolt az oldal lefut
    const [theTime, setTheTime] = useState(new Date().toLocaleString()) 

    //2 vár 1s-et és végrehajtja, de mivel a setTheTime frissul -> 3
    // setTimeout(function() {
    //     setTheTime (new Date().toLocaleString())
    // }, 1000)

    //ezt igy csak akkor hivja meg, amikor betoltodik, elinditja az intervalt es azt fut vegig
    useEffect(() => {
        const interval = setInterval(() => setTheTime (new Date().toLocaleString()), 1000)
        
        return () => clearInterval(interval) //cleanup function
    },[])

    return (
        <p className="special">The current time is {theTime}</p>
    );
}

function AddPetForm(props) {

    const [name, setName] = useState()
    const [species, setSpecies] = useState()
    const [age, setAge] = useState()


    function handleSubmit (e) {
        e.preventDefault()
        props.setPets(prev => prev.concat({name, species, age, id: Date.now()}))
        setName("")
        setSpecies("")
        setAge("")
    }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="species" />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="age in years" />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}

function IndividualPets(props) {
    
    function handleDelete() {
        props.setPets(prev => prev.filter(pet => pet.id != props.id))
    }
    
    return (
        <li>
            {props.name} is a {props.species} and {props.age} years old
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}


export default Pet;