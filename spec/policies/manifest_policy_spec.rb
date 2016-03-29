require 'rails_helper'

describe ManifestPolicy do
  permissions :can_sign? do
    it 'allows user with signer role to sign own manifest' do
      user = create(:user)
      manifest = create(:manifest, user: user)
      profile_syncer = UserProfileSyncer.new(user, mock_cdx_user_profile)
      profile_syncer.run

      expect(ManifestPolicy).to permit(user, manifest)
    end

    it 'disallows user with signer role to sign manifest owned by someone in different org' do
      user = create(:user)
      manifest = create(:manifest)
      profile_syncer = UserProfileSyncer.new(user, mock_cdx_user_profile)
      profile_syncer.run

      expect(ManifestPolicy).to_not permit(user, manifest)
    end

    it 'allows user with signer role to sign manifest owned by someone in shared org' do
      user = create(:user)
      user2 = create(:user)
      manifest = create(:manifest, user: user2)
      profile_syncer = UserProfileSyncer.new(user, mock_cdx_user_profile)
      profile_syncer.run
      profile_syncer2 = UserProfileSyncer.new(user2, mock_cdx_user_profile)
      profile_syncer2.run

      expect(ManifestPolicy).to permit(user, manifest)
    end

    it 'disallows user with signer role in different org from the org shared with manifest owner' do
      user = create(:user)
      user2 = create(:user)
      manifest = create(:manifest, user: user2)
      org1 = create(:organization)
      org2 = create(:organization)
      signer_role = create(:role, :tsdf_certifier)
      anon_role = create(:role)
      uor1 = create(:user_org_role, user: user, organization: org1, role: signer_role)
      uor2 = create(:user_org_role, user: user, organization: org2, role: anon_role)
      uor3 = create(:user_org_role, user: user2, organization: org2, role: signer_role)

      expect(ManifestPolicy).to_not permit(user, manifest)
    end
  end

  permissions :can_view? do
    it 'allows state_data_download user to see all manifests in their state' do
      user = create(:user)
      user_org_role = create(:user_org_role, :state_data_download, user: user, profile: { subject: 'KS' })
      manifest = create(:manifest, content: {
        generator: {
          manifest_tracking_number: random_tracking_number,
          mailing_address: { state: 'KS' }
        }
      })

      expect(ManifestPolicy).to permit(user, manifest)
    end

    it 'allows epa_data_download user to see all manifests' do
      user = create(:user)
      user_org_role = create(:user_org_role, :epa_data_download, user: user)
      manifest = create(:manifest)

      expect(ManifestPolicy).to permit(user, manifest)
    end
  end
end
