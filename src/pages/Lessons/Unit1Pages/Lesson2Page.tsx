import Lesson2Simulation from "./simulationComponents/Lesson2Simulation";
import LessonSection from "../LessonSection";
import "../styles/lessons.css"

export default function Lesson2Page() {
  return (
    <div className="lessonPage">
      <h1>
        Lesson 1. Properties of Atoms
      </h1>
      <LessonSection>
        <h2>Defining Motion.</h2>
        <p>Our study of physics opens with kinematics—the study of motion without considering its causes. 
          Objects are in motion everywhere you look. Everything from a tennis game to a space-probe 
          flyby of the planet Neptune involves motion. 
          When you are resting, your heart moves blood through your veins. 
          Even in inanimate objects, atoms are always moving.</p>
        <p>How do you know something is moving? The location of an object 
          at any particular time is its position. More precisely, you need to specify 
          its position relative to a convenient reference frame. Earth is often used as a reference frame,
           and we often describe the position of an object as it relates to stationary objects in that reference frame. 
           For example, a rocket launch would be described in terms of the position of the rocket with respect to Earth as
            a whole, while a professor’s position could be described in terms of where she is in relation to the nearby white board. 
            In other cases, we use reference frames that are not stationary but are in motion relative to Earth. To describe the position of 
           a person in an airplane, for example, we use the airplane, not Earth, as the reference frame.</p>
        <p>Content</p>
        <p>Content</p>
      </LessonSection>

      <Lesson2Simulation />
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
}
