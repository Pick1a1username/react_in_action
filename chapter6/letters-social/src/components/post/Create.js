import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from 'bad-words';
import classnames from "classnames";


import DisplayMap from "../map/DisplayMap";
import LocationTypeAhead from '../map/LocationTypeAhead';

const filter = new Filter();

class CreatePost extends Component {
    static propTypes = {
    }
    constructor(props) {
        super(props);

        this.initialState = {
            content: '',
            valid: false,
            showLocationPicker: false,
            location: {
                lat: 34.1535641,
                lng: -118.1428115,
                name: null
            },
            locationSelected: false
        };

        this.state = this.initialState;
        this.filter = new Filter();

        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggleLocation = this.handleToggleLocation.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
        this.onLocationUpdate = this.onLocationUpdate.bind(this);

        this.renderLocationControls = this.renderLocationControls.bind(this);
    }

    handlePostChange(event) {
        const content = filter.clean(event.target.value);
        this.setState(() => {
            return {
                content,
                valid: content.length <= 280,
            };
        });
    }

    handleSubmit() {
        event.preventDefault();

        if (!this.state.valid) {
            return;
        }

        if (this.props.onSubmit) {
            const newPost = {
                // date: Date.now(),
                // id: Date.now(),
                content: this.state.content,
            };

            // When submitting a post, add location to payload if present.
            if (this.state.locationSelected) {
                newPost.location = this.state.location;
            }

            this.props.onSubmit(newPost);
            this.setState( () => ({
                content: '',
                valid: null,
                showLocationPicker: false,
                location: this.initialState.location,
                locationSelected: false
            }));
        }
    }

    handleRemoveLocation() {
        this.setState(() => ({
            locationSelected: false,
            location: this.initialState.location
        }));
    }

    onLocationUpdate(location) {
        this.setState(() => ({ location }));
    }

    onLocationSelect(location) {
        this.setState(() => ({
            location,
            showLocationPicker: false,
            locationSelected: true
        }));
    }

    handleToggleLocation(e) {
        e.preventDefault();
        this.setState(state => ({ showLocationPicker: !state.showLocationPicker }));
    }

    renderLocationControls() {
        return (
            <div className="controls">
                <button onClick={this.handleSubmit}>Post</button>
                {/* If a location is selected, show button that allows users to remove their location. */}
                {this.state.location && this.state.locationSelected ? (
                    <button
                        onClick={this.handleRemoveLocation}
                        className="open location-indicator">
                            <i className="fa-location-arrow fa" />
                            <small>{this.state.location.name}</small>
                    </button>
                ) : (
                    // {/* Show button that will toggle location picker components */}
                    <button
                        onClick={this.handleToggleLocation}
                        className="open">
                        {/* Show button that will toggle location picker components */}
                        {this.state.showLocationPicker ? 'Cancel' : 'Add location'}{' '}
                        <i
                            className={classnames(`fa`, {
                                'fa-map-o': !this.state.showLocationPicker,
                                'fa-times': this.state.showLocationPicker
                            })}
                        />
                    </button>
                )}
            </div>
        )
    }

    render () {
        return (
            <div className="create-post">
                <button onClick={this.handleSubmit}>Post</button>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
                {this.renderLocationControls()}
                <div
                    className="location-picker"
                    style={{ display: this.state.showLocationPicker ? 'block' : 'none' }}
                >
                    {!this.state.locationSelected && [
                        <LocationTypeAhead
                            key="LocationTypeAhead"
                            onLocationSelect={this.onLocationSelect}
                            onLocationUpdate={this.onLocationUpdate}
                        />,
                        <DisplayMap
                            key="DisplayMap"
                            displayOnly={false}
                            location={this.state.location}
                            onLocationSelect={this.onLocationSelect}
                            onlocationUpdate={this.onLocationUpdate}
                        />
                    ]}
                </div>
            </div>
        );
    }
}

export default CreatePost;