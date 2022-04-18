import { shallow } from "enzyme";
import { render, unmountComponentAtNode } from "react-dom";
import React, { useEffect } from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { act } from '@testing-library/react';
import ReactDOM from "react-dom";
import User, { BASE_URL, IUserData, RetriveData } from "./User";

let container: any = null;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

describe("User", () => {
	it("should render successfully", () => {
		// jest.spyOn(React, 'useEffect').mockImplementation((f)=>f());
		const myMock = jest.fn();
		myMock("useEffect");
		act(() => {
			render(<User />, container);
		});

		expect(container).toBeTruthy();
	});

	it("Enter Username", async () => {
		// jest.spyOn(React, 'useEffect').mockImplementation((f)=>f());
		const myMock = jest.fn();
		myMock("useEffect");
		act(() => {
			render(<User />, container);
		});
		expect(container.textContent).toContain("Enter Username");
	});
});
jest.mock("axios");

describe("retriveData", () => {

	describe("when API call is successful", () => {
		it("should return users list", async () => {
			// given
			const mockUsers: IUserData[] = [
				{ id: 1, login: "test", avatar_url: "xyz" }
			];

			(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockUsers);

			// when
			await RetriveData();

			// then
			expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}`);
		});
	});

	// describe("when API call fails", () => {
	// 	it("should return empty users list", async () => {
	// 		// given
	// 		const message = "Network Error";
	// 		mockAxios.get.mockRejectedValueOnce(new Error(message));

	// 		// when
	// 		const result = await RetriveData();

	// 		// then
	// 		expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}`);
	// 		expect(result).toEqual([]);
	// 	});
	// });
});