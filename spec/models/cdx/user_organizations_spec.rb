require 'rails_helper'

describe 'CDX::UserOrganizations' do
  it '#perform' do
    VCR.use_cassette('user_organizations_perform') do
      opts = { user_id: 'e-manifest-dev', dataflow: 'eManifest' }
      orgs = CDX::UserOrganizations.new(opts, output_stream)
      response = orgs.perform
      expect(response[0][:organization_name]).to eq('EPA 2')
    end
  end

  private

  def output_stream
    @_output_stream ||= StringIO.new('')
  end
end
