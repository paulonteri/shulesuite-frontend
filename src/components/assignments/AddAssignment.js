import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment, { isMoment } from "moment";
import {
    Form,
    Button,
    DatePicker,
    Input,
    Upload,
    Divider,
    message
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { addAssignment } from "../../actions/assignments/assignments";

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 13
    }
};

const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 13
    }
};

function AddAssignment(props) {
    // state
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);

    // forms
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    // OnSubmit
    const onFinishDetails = assignment => {
        // create formData
        const data = new FormData();
        for (let i of Object.entries(assignment)) {
            if (i[1] == null) {
            } else {
                if (isMoment(i[1])) {
                    data.append(i[0], i[1].toISOString());
                } else {
                    data.append(i[0], i[1]);
                }
            }
        }
        if (file1 !== null) {
            data.append("file1", file1);
        }
        if (file2 !== null) {
            data.append("file2", file2);
        }
        if (file3 !== null) {
            data.append("file3", file3);
        }

        // save Data
        props.addAssignment(data);

        form.resetFields();
        form2.resetFields();
        setFile1(null);
        setFile2(null);
        setFile3(null);
    };

    const onFinishFailedDetails = () => {};

    return (
        <div className="container card shadow rounded pt-3 ">
            <AddAssignmentDetails />
        </div>
    );

    function AddAssignmentDetails() {
        return (
            <Form
                form={form}
                {...layout}
                name="assignment_details"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinishDetails}
                onFinishFailed={onFinishFailedDetails}
            >
                <Form.Item
                    label="Title"
                    hasFeedback
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please give the task a name!"
                        }
                    ]}
                >
                    <Input
                        size="small"
                        placeholder="A relatable name for the task"
                        disabled={props.uploadingAssignments}
                    />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message:
                                "Please give the a small description on what the task involves!"
                        }
                    ]}
                >
                    <TextArea
                        size="small"
                        rows={4}
                        disabled={props.uploadingAssignments}
                        placeholder="Issue instructions and guidelines on what is and how to do the task"
                    />
                </Form.Item>
                <Form.Item
                    label="Starting Time"
                    name="time_starts"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select the time when the task starts!"
                        }
                    ]}
                >
                    <DatePicker
                        size="small"
                        placeholder="The time the students will start"
                        showTime
                        disabled={props.uploadingAssignments}
                        disabledDate={disabledDate}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </Form.Item>
                <Form.Item
                    label="Time Required"
                    name="time_required"
                    dependencies={["time_starts"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select the deadline for completion!"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("time_starts").isBefore(value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "The time the task is required should be before it starts!"
                                );
                            }
                        })
                    ]}
                >
                    <DatePicker
                        size="small"
                        placeholder="Submission Deadline"
                        disabled={props.uploadingAssignments}
                        showTime
                        defaultPickerValue={moment().endOf("minute")}
                        renderExtraFooter={() =>
                            "Select deadline for collection"
                        }
                        disabledDate={disabledDate}
                    />
                </Form.Item>

                <div>
                    <Divider>Add Files</Divider>
                </div>

                <div className="container text-center">
                    <Form
                        form={form2}
                        alignment="inline"
                        name="assignment_files"
                        initialValues={{
                            remember: true
                        }}
                    >
                        <div className="row ">
                            <div className="col-xs-4 m-auto">
                                <Form.Item name="file1">
                                    <Upload
                                        accept="image/*,text/*,video/*,audio/*"
                                        listType="picture-card"
                                        disabled={props.uploadingAssignments}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={e =>
                                            beforeUpload(e, "file1")
                                        }
                                    >
                                        {file1 == null ? (
                                            <UploadButton pops={file1} />
                                        ) : (
                                            <p>{file1.name}</p>
                                        )}
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div className="col-xs-4 m-auto">
                                <Form.Item name="file2">
                                    <Upload
                                        accept="image/*,text/*,video/*,audio/*"
                                        listType="picture-card"
                                        disabled={props.uploadingAssignments}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={e =>
                                            beforeUpload(e, "file2")
                                        }
                                    >
                                        {file2 == null ? (
                                            <UploadButton />
                                        ) : (
                                            <p>{file2.name}</p>
                                        )}
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div className="col-xs-4 m-auto">
                                <Form.Item name="file3">
                                    <Upload
                                        accept="image/*,text/*,video/*,audio/*"
                                        listType="picture-card"
                                        disabled={props.uploadingAssignments}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={e =>
                                            beforeUpload(e, "file3")
                                        }
                                    >
                                        {file3 == null ? (
                                            <UploadButton />
                                        ) : (
                                            <p>{file3.name}</p>
                                        )}
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <Form.Item {...tailLayout} className="text-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={props.uploadingAssignments}
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    // disabled Dates
    function disabledDate(current) {
        return current < moment().startOf("day");
    }

    // get a range of numbers
    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    //

    // // // //

    //

    // BEFORE UPLOAD
    function beforeUpload(docFile, name) {
        function errorF() {
            switch (name) {
                case "file1":
                    setFile1(null);
                    break;
                case "file2":
                    setFile2(null);
                    break;
                case "file3":
                    setFile3(null);
                    break;
            }
        }
        // Name length
        if (docFile.name.length > 99) {
            message.error(
                "Ensure the filename is no longer than 100 characters!"
            );
            errorF();
            return false;
        } else {
            // File Size
            let size = docFile.size / 1024 / 1024;
            if (size > 50) {
                message.error(`File size (${Math.floor(size)} mb) too large!`);
                errorF();
                return false;
            } else {
                switch (name) {
                    case "file1":
                        setFile1(docFile);
                        break;
                    case "file2":
                        setFile2(docFile);
                        break;
                    case "file3":
                        setFile3(docFile);
                        break;
                }
                return false;
            }
        }
    }

    function UploadButton(pops) {
        return (
            <Fragment>
                {props.uploadingAssignments ? (
                    <LoadingOutlined style={{ fontSize: "25px" }} />
                ) : (
                    <Fragment>
                        <UploadOutlined style={{ fontSize: "20px" }} />
                        <div className="ant-upload-text">
                            <p className="font-weight-light">Upload</p>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

AddAssignment.propTypes = {
    uploadedAssignments: PropTypes.bool.isRequired,
    uploadingAssignments: PropTypes.bool.isRequired,
    addAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    uploadingAssignments: state.assignmentsReducer.uploadingAssignments,
    uploadedAssignments: state.assignmentsReducer.uploadedAssignments
});

export default connect(mapStateToProps, { addAssignment })(AddAssignment);
