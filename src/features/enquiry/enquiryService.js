import api from '../../utils/axiosInstance';

const postEnquiry = async(data) => {
	const response = await api.post('enquiries',data);
	return response.data.data;
}

const enquiryService = {
	postEnquiry
}

export default enquiryService;