
import React from 'react';
import App from './App';
import SideBar from "./SideBar/SideBar";
import RightBar from "./SideBar/RightBar";
import HandleError from "./components/Common/HandleError";
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import Rightbar from './SideBar/RightBar';
import CourseDetails from "./components/Common/CourseDetails";
import MyCourses from "./components/Mycourses/MyCourses";
import { render, screen, act } from "@testing-library/react";


describe("rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
  
  it("renders Sidebar without crashing", () => {
    shallow(<SideBar />);
  });

  it("renders RightBar without crashing", () => {
    shallow(<RightBar />);
  });

  it("renders HandleError without crashing", () => {
    shallow(<HandleError />);
  });
});

//If In case there will be some update in the UI, then snapshot test will fail, so Need to update the snapshots.
describe("snapshots", () => {
  it("App snapshot for App component", () => {
    const tree = shallow(<App/>);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("App snapshot for SideBar component", () => {
    const sideBar = shallow(<SideBar/>);
    expect(toJson(sideBar)).toMatchSnapshot();
  });
  it("App snapshot for Rightbar component", () => {
    const rightBar = shallow(<Rightbar/>);
    expect(toJson(rightBar)).toMatchSnapshot();
  });
  it("App snapshot for HandleError component", () => {
    const handleError = shallow(<HandleError/>);
    expect(toJson(handleError)).toMatchSnapshot();
  });
});


describe("logic", () => {
  const match = { params : { courseid: 1 } };
  const wrapper = mount(<CourseDetails match={match} />);
  const course = mount(<MyCourses />);
  wrapper.find(".icon-pause").simulate("click");
  it("button click - Enroll Course", () => {
    // console.log(wrapper.debug());
    const timerVal = wrapper.find(".timer").text();
    const expectedValue = '02:54 / 09:55';
    expect(timerVal).toEqual(expectedValue);
  });
  it("Mycourses Page - title", () => {
    const removedValue = course.find(".page-title").text();
    const expectedBalanceValue = 'My Courses';
    expect(removedValue).toEqual(expectedBalanceValue);
  });
});

describe("Component", () => {
  it("Loads MyCourses Video Details", async () => {
    await act(async () => render(<MyCourses />));
    expect(screen.getByText("My Courses")).toBeInTheDocument;
  });
});
