import React from 'react'
import 'react-native'
import renderer from "react-test-renderer"
import App from './App'

test('Check the landing page', () => {
    const tree = renderer.create(<App/>).toJSON()
    expect(tree).toMatchSnapshot()
});